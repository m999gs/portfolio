console.clear();

const { gsap } = window;

const cursorOuter = document.querySelector(".cursor--large");
const cursorInner = document.querySelector(".cursor--small");
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.navigation-boxes');

let isStuck = false;
let mouse = {
	x: -100,
	y: -100,
};

let cursorOuterOriginalState = {
	width: cursorOuter.getBoundingClientRect().width,
	height: cursorOuter.getBoundingClientRect().height,
};
const buttons = document.querySelectorAll("main button");

buttons.forEach((button) => {
	button.addEventListener("pointerenter", handleMouseEnter);
	button.addEventListener("pointerleave", handleMouseLeave);
});

document.body.addEventListener("pointermove", updateCursorPosition);
document.body.addEventListener("pointerdown", () => {
	gsap.to(cursorInner, 0.15, {
		scale: 2,
	});
});
document.body.addEventListener("pointerup", () => {
	gsap.to(cursorInner, 0.15, {
		scale: 1,
	});
});

function updateCursorPosition(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
}

function updateCursor() {
	gsap.set(cursorInner, {
		x: mouse.x,
		y: mouse.y,
	});

	if (!isStuck) {
		gsap.to(cursorOuter, {
			duration: 0.15,
			x: mouse.x,
			y: mouse.y,
		});
	}

	requestAnimationFrame(updateCursor);
}

updateCursor();

function handleMouseEnter(e) {
	isStuck = true;
	var bodyRect = document.body.getBoundingClientRect();
	const targetBox = e.currentTarget.getBoundingClientRect();
	var offset = targetBox.top - bodyRect.top;
	gsap.to(cursorOuter, 0.2, {
		x: targetBox.left + targetBox.width / 2,
		y: offset + targetBox.height / 2,
		width: targetBox.width,
		height: targetBox.height,
		borderRadius: 0,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
	});
}

function handleMouseLeave(e) {
	isStuck = false;
	gsap.to(cursorOuter, 0.2, {
		width: cursorOuterOriginalState.width,
		height: cursorOuterOriginalState.height,
		borderRadius: "50%",
		backgroundColor: "transparent",
	});
}

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
	});
});