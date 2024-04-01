"use strict";

function disableScroll(event) {
	event.preventDefault();
}
window.addEventListener("wheel", disableScroll, { passive: false });
window.addEventListener("touchmove", disableScroll, { passive: false });

const orderEl = document.querySelector(".order");
const dice1 = document.querySelector(".dice-1");
const dice2 = document.querySelector(".dice-2");
const dice3 = document.querySelector(".dice-3");
const statusEl = document.querySelector(".status");

const btn = document.querySelector(".btn");

// Generate random number for "Phiên"
const generateRandomNumber = () =>
	(Math.floor(Math.random() * 1000000) % 1000000) + 100000;
let randomNumber = generateRandomNumber();

// Update "Phien" number function
const updatePhien = (Number) => {
	orderEl.innerHTML = `Phiên #${Number}`;
};

updatePhien(randomNumber);

// isRunning is set to false when first log
let isRunning = false;

// Init when user come to the website
const init = () => {
	for (let i = 1; i <= 3; i++) {
		const dice = document.querySelector(`.dice-${i}`);
		dice.src =
			"https://t4.ftcdn.net/jpg/04/07/11/11/360_F_407111111_Fkpd2bqOdmEEOACr7fz8f39UClzgBpjH.jpg";
	}

	btn.style.pointerEvents = "initial";

	statusEl.classList.remove("status--result");
	statusEl.classList.add("status--notusing");
	statusEl.innerHTML = "Hãy quay để tìm kiếm may mắn...";
};

init();

const generateResult = () => {
	btn.style.pointerEvents = "none";

	randomNumber++;
	updatePhien(randomNumber);

	const list = Array.from(
		{ length: 3 },
		() => Math.trunc(Math.random() * 6) + 1
	);

	for (const [index, result] of list.entries()) {
		const dice = document.querySelector(`.dice-${index + 1}`);
		dice.src = `./dice-${result}.png`;
	}

	const result = list.reduce((arr, i) => arr + i);
	const resultInText = result <= 10 ? "Xỉu" : "Tài";
	const resultClass = result <= 10 ? "xiu" : "tai";

	statusEl.classList.remove("status--notusing");
	statusEl.classList.add("status--result");
	statusEl.innerHTML = `
    Kết quả phiên #${randomNumber}:
				<span class="status__dice-result--number">${list[0]} ${list[1]} ${list[2]} (${result})</span> -
				<span
					class="status__dice-result--text status__dice-result--text--${resultClass}"
				>
					${resultInText}
				</span>
    `;

	setTimeout(init, 3000);
};

btn.addEventListener("click", generateResult);
