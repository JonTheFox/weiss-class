import React, { useContext, useRef, useEffect, useCallback } from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
//import Paper from "@material-ui/core/Paper";
import "./_SuperBasicTable.scss";

//example columns argument:
// const columns = [
// 	{ title: "Transcript", field: "transcript" },
// 	{ title: "Confidence", field: "confidence" }
// ];
//const data = [
// 	{ transcript: "hello", confidence: 1 },
// 	{ transcript: "goodbye", confidence: 1 },
// ];

let logg;
//let loggError;
const label = "SuperBasicTable";
const emptyCellsRef = { sbt: { cells: [] } };

const SuperBasicTable = React.forwardRef((props, ref) => {
	const {
		columns,
		data,
		noHeader,
		noBody,
		className = "",
		rowClass = "",
		columnEvenClass = "",
		columnOddClass = "",
		columnClasses = [],
		cellClass = "",
		headerClass = "",
		renderEvenColumn,
		renderOddColumn,
		tabIndexFirstIndex = 1,
		onBlur,
		onRowFocus,
		onCellClick,
		onCellDoubleClick,
	} = props;

	let { sharedRefs } = props;
	if (!sharedRefs || !sharedRefs.current) {
		sharedRefs = useRef(emptyCellsRef);
	}

	const [appUtils] = useContext(AppContext);
	const { emptyFunc, Logger } = appUtils;
	// const { PromiseKeeper } = issy;
	// promiseKeeper = promiseKeeper || new PromiseKeeper({ label });
	// logg = logg || new Logger({ label }).logg;

	if (!columns) return null;

	const initCellRefs = useCallback(() => {
		//create a 2D array of rows x columns

		if (!sharedRefs.current.sbt) sharedRefs.current.sbt = { cells: [] };
		const allCells = sharedRefs.current.sbt.cells;
		for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
			allCells[rowIndex] = [];
			const rowData = data[rowIndex];
			for (
				let columnIndex = 0;
				columnIndex < columns.length;
				columnIndex++
			) {
				const columnData = columns[columnIndex];
				const columnName = columnData.field;
				allCells[rowIndex][columnIndex] = {
					columnName,
					rowData,
					rowIndex,
					columnIndex,
					columnData,
				};
			}
		}
	}, [sharedRefs, data, columns]);
	initCellRefs(data, columns);

	useEffect(() => {
		const logger = new Logger({ label });
		logg = logger.logg;
		// loggError = logger.loggError;
	}, [Logger]);

	useEffect(() => {
		logg("sharedRefs.current.sbt.cells: ", sharedRefs.current.sbt.cells);
	}, [data, sharedRefs]);

	let cellIndex = 0;
	const allCells = sharedRefs.current.sbt.cells;

	return (
		<div
			className={clsx("basic-table-container", className && className)}
			ref={ref}
		>
			<table
				className={clsx(
					"table",

					noHeader && "hide-header"
				)}
			>
				<thead>
					<tr className={clsx("row header-row")}>
						{columns.map(({ title, field }, i) => (
							<th
								className={clsx(
									"table-header",
									headerClass && headerClass,
									field
								)}
								key={`th-${i}`}
								onFocus={onRowFocus}
							>
								<span className={"header-cell"}>
									{noHeader ? "" : title}
								</span>
							</th>
						))}
					</tr>
				</thead>

				{!noBody && (
					<tbody>
						{!data || data.length <= 0 ? (
							<tr className={clsx("row empty", "row-even")}>
								<td className={clsx("table-cell")}>
									<p></p>{" "}
								</td>
							</tr>
						) : (
							data.map((rowData, rowIndex) => {
								const { rowName } = rowData; //e.g: positive, negative..

								return (
									<tr
										className={clsx(
											rowName && rowName,
											"row",
											rowIndex % 2 === 0
												? "row-even"
												: "row-odd",
											`row-${rowIndex}`,
											rowClass
										)}
										key={`tr-${rowIndex}`}
										onFocus={
											onRowFocus &&
											onRowFocus.bind(rowData)
										}
									>
										{columns.map(
											(columnData, columnIndex) => {
												const {
													field,
													title,
													mapFn,
													editable,
												} = columnData;

												// const entry = data[rowIndex];
												const fieldValue =
													rowData[field];
												const hasValue =
													fieldValue ||
													fieldValue === 0;
												if (!hasValue) {
													debugger;
												}
												const _value = hasValue
													? fieldValue
													: "";
												const displayedVal =
													(mapFn && mapFn(_value)) ||
													_value;

												cellIndex++;
												const isEvenColumn =
													columnIndex % 2 === 0;

												const cellData = {
													columnName: field,
													rowData,
													rowIndex,
													columnIndex,
													columnData,
												};
												allCells[rowIndex][
													columnIndex
												] = cellData;

												return (
													<td
														className={clsx(
															"table-cell",
															`${field}`,
															columnClasses &&
																columnClasses.length &&
																columnClasses[
																	columnIndex
																] &&
																columnClasses[
																	columnIndex
																],
															isEvenColumn
																? `column-even${
																		columnEvenClass
																			? " " +
																			  columnEvenClass
																			: ""
																  }`
																: `column-odd${
																		columnOddClass
																			? " " +
																			  columnOddClass
																			: ""
																  }`,
															hasValue
																? "has-value"
																: "no-value"
														)}
														key={`td-${columnIndex}`}
														tabIndex={
															tabIndexFirstIndex +
															cellIndex
														}
														onClick={
															onCellClick &&
															onCellClick.bind(
																cellData
															)
														}
														onDoubleClick={
															onCellDoubleClick &&
															onCellDoubleClick.bind(
																cellData
															)
														}
														ref={(_ref) => {
															if (_ref) {
																cellData.ref = _ref;
															}
														}}
													>
														<div
															className={clsx(
																cellClass &&
																	cellClass,
																"in-cell word-breaker"
															)}
															contentEditable={
																editable
															}
															onBlur={
																onBlur ||
																emptyFunc
															}
														>
															{isEvenColumn
																? renderEvenColumn
																	? renderEvenColumn(
																			displayedVal,
																			columnIndex
																	  )
																	: displayedVal
																: renderOddColumn
																? renderOddColumn(
																		displayedVal,
																		columnIndex
																  )
																: displayedVal}
														</div>
													</td>
												);
											}
										)}
									</tr>
								);
							})
						)}
					</tbody>
				)}
			</table>
		</div>
	);
});

SuperBasicTable.propTypes = {
	className: PropTypes.string,
	columns: PropTypes.arrayOf(PropTypes.object),
	data: PropTypes.arrayOf(PropTypes.object),
	sharedRefs: PropTypes.objectOf(PropTypes.object),
	//a data entry can hold a rowName property, which will be added to the row as a class
	columnEvenClass: PropTypes.string,
	columnOddClass: PropTypes.string,
	columnClasses: PropTypes.arrayOf(PropTypes.string),
	cellClass: PropTypes.string,
	headerClass: PropTypes.string,
	renderEvenColumn: PropTypes.func,
	renderOddColumn: PropTypes.func,
	noHeader: PropTypes.bool,
	noBody: PropTypes.bool,
	tableClass: PropTypes.string,
	tabIndexFirstIndex: PropTypes.number,
	onBlur: PropTypes.func,
	onRowFocus: PropTypes.func,
	onCellClick: PropTypes.func,
	onCellDoubleClick: PropTypes.func,
};

export default SuperBasicTable;
