export const bcryptPasswordCompare = async function (
	password: string,
	hashedPassword: string,
) {
	const { default: bcrypt } = await import("bcryptjs");

	return bcrypt.compare(password, hashedPassword);
};

export async function bcryptPasswordHash(password: string) {
	const { default: bcrypt } = await import("bcryptjs");
	const bcryptSaltRounds = Number.parseInt("10", 10);

	return bcrypt.hash(password, bcryptSaltRounds);
}
