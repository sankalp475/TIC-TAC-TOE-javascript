const cell = document.querySelectorAll('.grid-css-')
const reset = document.querySelector('.re-set')
const box_ = document.querySelector('#current_turn')
const gameContainer = document.querySelector('.gameBoard')
const PlayerX = document.querySelector('.player_0_score')
const PlayerY = document.querySelector('.player_1_score')

let classx = 'x-mark'
let classy = 'o-mark'
let circle_turn;
let turn = 'x';
let score_bard = 0
let xscore = document.querySelector('#cpu-score')
let yscore = document.querySelector('#your_score')
xscore.innerHTML = 0;
yscore.innerHTML = 0;
let gameover = false;
let sx = 0;
let sy = 0;
let T = 0;
startgame()
reset.addEventListener('click', () => {
	startgame()
	sx = 0
	sy = 0
	localStorage.setItem('-x-', sx)
	localStorage.setItem('-y-', sy)
	xscore.innerHTML = localStorage.getItem('-x-')
    yscore.innerHTML = localStorage.getItem('-y-')
})
function startgame() {

	cell.forEach((cell) => {
		cell.classList.remove(classx)
		cell.classList.remove(classy)
		cell.removeEventListener('click', HandleClick)
		cell.addEventListener('click', HandleClick, { once: true })
		// gameContainer.classList.add('x-turn')

	})
}

function HandleClick(e) {

	const CurrentClass = circle_turn ? classy : classx
	console.log(CurrentClass)
	let _cell_  = e.target
	changeTurn()

	addMarker(_cell_, CurrentClass)

	swapCurrentClass()

	hoverFunction()

	checkForWin(CurrentClass)

	// isdraw(CurrentClass)
}

function isdraw() {

	cell.forEach(cellelement => {

	})
}






let xturn = 'x-turn'
let yturn = 'o-turn'

function addMarker(_cell_, CurrentClass) {
	console.log(cell, CurrentClass)
	_cell_.classList.add(CurrentClass)
}

function hoverFunction() {
	gameContainer.classList.remove('x-turn')
	gameContainer.classList.remove('o-turn')

	if (circle_turn) {
		gameContainer.classList.add(yturn)
	} else {
		gameContainer.classList.add(xturn)
	}
}

if (turn === 'x') {
	gameContainer.classList.add(xturn)
} else {
	gameContainer.classList.add(yturn)
}

function changeTurn() {
	(turn === 'x') ? turn = 'o' : turn = 'x'
	box_.innerHTML = turn

	let opacity1 = 'opacity-1'
	let opacity0 = 'opacity-0.3'
	if (turn === 'x') {
		PlayerX.classList.remove(opacity1)
		PlayerX.classList.add(opacity0)
		PlayerY.classList.remove(opacity0)
		PlayerY.classList.add(opacity1)
	}
	if(turn === 'o'){
		PlayerX.classList.remove(opacity0)
		PlayerX.classList.add(opacity1)
		PlayerY.classList.remove(opacity1)
		PlayerY.classList.add(opacity0)
	}

	// console.log(turn)

}
function swapCurrentClass() {
	circle_turn = !circle_turn
}
box_.innerHTML = turn

let opacity1 = 'opacity-1'
let opacity0 = 'opacity-0.3'
if (turn === 'x') {
	PlayerX.classList.add(opacity0)
	PlayerY.classList.add(opacity1)
}

const WIN_PATTERN = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6],
]

function checkForWin(CurrentClass) {
	let box = document.getElementsByClassName('grid-css-')
	function winner_name(CurrentClass) {
        return CurrentClass === 'x-mark'? 'x won' : 'o won'
	}
 	WIN_PATTERN.forEach((e, pattern) => {
		if (
			(box[e[0]].classList.contains(CurrentClass) === box[e[1]].classList.contains(CurrentClass)) &&
			(box[e[2]].classList.contains(CurrentClass) === box[e[1]].classList.contains(CurrentClass)) &&
			(box[e[0]].classList.contains(CurrentClass))
		) {
			let winner_massage = winner_name(CurrentClass)
			let h = `<Button class="d danger">${winner_name(CurrentClass)}</Button>`
			const container = document.querySelector('.flex-box-container')
			container.innerHTML = h
			if (winner_massage === 'x won') {
				sx = sx + 1
				let x = localStorage.setItem('-x-', sx)
				xscore.innerHTML = sx
				gameContainer.classList.remove(xturn)
				gameContainer.classList.remove(yturn)
			} else {
				sy = sy + 1
				let y = localStorage.setItem('-y-', sy)
				yscore.innerHTML = sy
				gameContainer.classList.remove(xturn)
				gameContainer.classList.remove(yturn)
			}
			gameover = true;

			setTimeout(() => {
				let h = `<button class="d" data-context="turn">
				<span id="current_turn">${turn}</span> turn
			    </button>
			    <button class="r mark re-set" data-context="">re set</button>`
				container.innerHTML = h

				cell.forEach((cell) => {
					if (CurrentClass === 'x-mark') {
						cell.classList.remove('x-mark')
						cell.classList.remove('o-mark')
					} else {
						cell.classList.remove('x-mark')
						cell.classList.remove('o-mark')
					}
				})

				if (CurrentClass === 'x-mark') {
					gameContainer.classList.add(yturn)
				} else {
					gameContainer.classList.add(xturn)
				}
				startgame()
			}, 2000)

		} else {
			gameover = true
		}
	})
}

xscore.innerHTML = localStorage.getItem('-x-')
yscore.innerHTML = localStorage.getItem('-y-')
document.getElementById('Ties-score').innerHTML = localStorage.getItem('t')
console.log("%cTic Tac Toe", "background: none; color: red; font-family: 'Zen Loop', cursive; font-size:40px");