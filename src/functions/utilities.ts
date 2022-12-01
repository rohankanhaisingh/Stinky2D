/**
 * Asynchronous function that stops the program for a certain amount of time and then continues.
 * @param ms Time to continue.
 */
export async function WaitFor(ms: number): Promise<number> {
	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve(Date.now());
		}, ms);
	});
}

export async function LoadImageSync(url: string): Promise<HTMLImageElement> {
	return new Promise(function (resolve, reject) {
		const img = new Image();
		img.src = url;
		img.addEventListener("load", function () {
			resolve(img);
		});
		img.addEventListener("error", function () {
			reject();
		});
	});
}