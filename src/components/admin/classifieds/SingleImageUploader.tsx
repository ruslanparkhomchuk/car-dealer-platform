"use client";

import { MAX_IMAGE_SIZE } from "@/config/constants";
import { endpoints } from "@/config/endpoints";
import { api } from "@/lib/apiClient";
import { cn, convertToMb } from "@/lib/utils";
import { ImagePlus, Loader2 } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";

interface ImageUploaderProps {
	onUploadComplete: (url: string) => void;
}

export function ImageUploader(props: ImageUploaderProps) {
	const { onUploadComplete } = props;
	const [preview, setPreview] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadComplete, setUploadComplete] = useState(false);
	const [draggingOver, setDraggingOver] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		e.stopPropagation();

		const file = e.target.files?.[0];
		if (!file) {
			return;
		}
		if (file.size > MAX_IMAGE_SIZE) {
			setError(`File size exceeds ${convertToMb(file.size)} limit`);

			return;
		}

		setError(null);
		setIsUploading(true);

		const reader = new FileReader();

		reader.onloadend = () => {
			setPreview(reader.result as string);
		};

		reader.readAsDataURL(file);

		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await api.post<{ url: string }>(
				endpoints.images.singleUpload,
				{
					body: formData,
				},
			);
			const { url } = response;

			onUploadComplete(url);
			setUploadComplete(true);
		} catch (error) {
			console.log("Error uploading file: ", error);

			setError("Failed to upload image. Please try again.");
		} finally {
			setIsUploading(false);
		}
	}

	async function handleDrop(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.stopPropagation();
		setDraggingOver(false);

		const file = e.dataTransfer.files?.[0];
		if (!file) {
			return;
		}

		if (file.size > MAX_IMAGE_SIZE) {
			setError(`File size exceeds ${convertToMb(file.size)} limit`);

			return;
		}

		setError(null);
		setIsUploading(true);

		const reader = new FileReader();

		reader.onloadend = () => {
			setPreview(reader.result as string);
		};

		reader.readAsDataURL(file);

		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await api.post<{ url: string }>(
				endpoints.images.singleUpload,
				{
					body: formData,
				},
			);

			const { url } = response;

			onUploadComplete(url);
			setUploadComplete(true);
		} catch (error) {
			console.log("Error uploading file: ", error);

			setError("Failed to upload image. Please try again.");
		} finally {
			setIsUploading(false);
		}
	}

	function stopEvent(e: DragEvent<HTMLInputElement>) {
		e.preventDefault();
		e.stopPropagation();
	}
	function handleDragEnter(e: DragEvent<HTMLInputElement>) {
		stopEvent(e);
	}
	function handleDragLeave(e: DragEvent<HTMLInputElement>) {
		stopEvent(e);
		setDraggingOver(false);
	}
	function handleDragOver(e: DragEvent<HTMLInputElement>) {
		stopEvent(e);
		setDraggingOver(true);
	}

	function handleClick() {
		inputRef.current?.click();
	}

	return (
		<div className="w-full mx-auto">
			<div
				onDrop={handleDrop}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onClick={handleClick}
				onKeyDown={() => null}
				className={cn(
					"relative flex aspect-3/2 cursor-pointer flex-col items-center justify-center rounded-md",
					error && "border-red-500 border-2 border-dotted",
					isUploading && "pointer-events-none opacity-50",
					draggingOver && "opacity-50",
					!uploadComplete && "border-2 border-dashed border-gray-300",
				)}
			>
				<input
					ref={inputRef}
					type="file"
					accept="image/*"
					onChange={handleUpload}
					className="hidden"
					disabled={isUploading}
					multiple={false}
				/>
				{preview ? (
					<img
						src={preview}
						alt="Preview"
						className="h-full w-full object-cover rounded-md"
					/>
				) : (
					<div className="text-center flex items-center justify-center flex-col">
						<ImagePlus className="mx-atuo w-12 h-12 text-gray-400" />
						<p className="mt-1 text-sm text-gray-600">
							Click or drag to upload image (max 2mb)
						</p>
					</div>
				)}
				{isUploading && (
					<div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
						<Loader2 className="w-8 h-8 animate-spin text-gray-500" />
					</div>
				)}
			</div>
			{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
		</div>
	);
}
