import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "./Layout.scss";

export default function Layout() {
	const [piecesPosition, setPiecesPosition] = useState([]);
	const [possibleMoves, setPossibleMoves] = useState([]);

	useEffect(() => {
		let savedPositions = localStorage.getItem("PIECES_POSITION");
		if (savedPositions) {
			setPiecesPosition(JSON.parse(savedPositions));
		} else {
			setPiecesPosition([
				{
					id: 1,
					name: "King",
					position: 60,
				},
				{ id: 2, name: "Queen", position: 61 },
				{
					id: 3,
					name: "Bishop",
					position: 62,
				},
				{
					name: "Bishop",
					id: 4,
					position: 59,
				},
				{
					id: 5,
					name: "Knight",
					position: 58,
				},
				{
					name: "Knight",
					id: 6,
					position: 63,
				},
				{
					name: "Rook",
					id: 7,
					position: 64,
				},
				{
					name: "Rook",
					id: 8,
					position: 57,
				},
				{
					id: 9,
					name: "Pawn",
					position: 51,
				},
				{
					id: 10,
					name: "Pawn",
					position: 52,
				},

				{
					id: 11,
					name: "Pawn",
					position: 53,
				},

				{
					id: 12,
					name: "Pawn",
					position: 54,
				},

				{
					id: 13,
					name: "Pawn",
					position: 55,
				},

				{
					id: 14,
					name: "Pawn",
					position: 56,
				},
				{
					id: 15,
					name: "Pawn",
					position: 57,
				},
				{
					id: 16,
					name: "Pawn",
					position: 58,
				},
				{
					id: 15,
					name: "Pawn",
					position: 50,
				},
				{
					id: 16,
					name: "Pawn",
					position: 49,
				},
			]);
		}
	}, []);
	const [selectedBox, setSelectedBox] = useState(0);
	const [pickedPiece, setPickedPiece] = useState({});

    const clickHandler = (index, color, piece) => {
        console.log(index, color, piece, "index, color, piece")
		if (pickedPiece && pickedPiece.id) {
			if (pickedPiece.position === index) {
				setPickedPiece(null);
				setPossibleMoves([]);
				setSelectedBox("");
				return;
			}
			let anotherPiecePicked = piecesPosition.find(
				(piece) => piece.position === index
			);
			if (anotherPiecePicked) {
				setPickedPiece(anotherPiecePicked);
				setSelectedBox(anotherPiecePicked.position);
				setPossibleMoves(
					getPossibleMoves(
						anotherPiecePicked,
						anotherPiecePicked.position
					)
				);
				return;
			}
			if (possibleMoves.indexOf(index) === -1) {
				return;
			}
			let otherPiecesPosition = piecesPosition.filter(
				(piece) => piece.id !== pickedPiece.id
			);
			let updatedPosition = [
				...otherPiecesPosition,
				{
					id: pickedPiece.id,
					name: pickedPiece.name,
					position: index,
				},
			];
			setPiecesPosition(updatedPosition);
			localStorage.setItem("PIECES_POSITION", JSON.stringify(updatedPosition));
			setPickedPiece(null);
			setSelectedBox("");
			setPossibleMoves([]);
			return;
		}
		if (!piece) {
			return;
		}
		setPickedPiece(piece);
		setPossibleMoves(getPossibleMoves(piece, index));
		if (selectedBox === index) {
			setSelectedBox("");
		} else {
			setSelectedBox(index);
		}
	};

	const getPossibleMoves = (piece, index) => {
		switch (piece.name) {
			case "Pawn":
				return [index - 8];
			case "Bishop":
				return [index - 8];
		}
	};

	const renderBoard = () => {
		let layout = [];
		let reverse = true;
		for (let i = 1; i <= 64; i++) {
			let piece = piecesPosition.find((item) => item.position === i);
			let color;
			if (reverse) {
				color = i % 2 === 0 ? "black" : "white";
			} else {
				color = i % 2 === 0 ? "white" : "black";
			}
			layout.push(
				<div
					key={i}
					id={`section-${i}`}
					onClick={() => {
						clickHandler(i, color, piece);
					}}
					className={classNames(
						"boardSection",
						color,
						selectedBox === i ? "selected" : "",
						possibleMoves.indexOf(i) !== -1 ? "possible" : ""
					)}
				>
					<div className="piece">{piece && piece.name}</div>
				</div>
			);
			if (i % 8 === 0) {
				reverse = !reverse;
			}
		}
		return layout;
	};

	return (
		<div className="container">
			<div className="controls">
				<button
					className="reset-btn"
					onClick={() => {
						localStorage.removeItem("PIECES_POSITION");
						window.location.reload();
					}}
				>
					Reset Game
				</button>
			</div>
			<div id="board" className="board">
				{renderBoard()}
			</div>
		</div>
	);
}
