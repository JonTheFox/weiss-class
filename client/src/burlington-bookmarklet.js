javascript: (function() {
	const YELLOW = "rgb(255, 255, 170)";
	const LIGHT_BLUE = "rgb(187, 255, 238)";
	const DARK_PINK = "rgb(238, 170, 255)";
	const SALMON = "rgb(255, 204, 204)";
	const raisedShadow = "2px 4px 6px black";

	const stylePresets = {
		yellow: `background-color: ${YELLOW}`,
		lightBlue: `background-color: ${LIGHT_BLUE}; padding: 0 4px`,
		darkPink: `background-color: ${DARK_PINK}`,
		salmon: `background-color: ${SALMON}`
	};

	const raise = (domElem, config = {}) => {
		if (!domElem) return null;
		const { scale = "1.5", boxShadow = raisedShadow } = config;
		domElem.style.transition = "all 0.75s";
		domElem.style.transform = `scale3d(${scale}, ${scale}, ${scale})`;
		domElem.style.boxShadow = boxShadow;
	};

	const centerInPage = domElem => {
		domElem.style.position = "absolute";
		domElem.style.top = "50%";
		domElem.style.left = "50%";
		domElem.style.transform = "translate(-50%, -50%)";
		domElem.style.transition = "transform 1s";
	};

	const removeStyles = domNode => {
		if (!domNode) return null;
		domNode.style = {};
	};

	const loggFactory = ({ label = "", stylePreset, context }) => {
		const _preset = stylePresets[stylePreset] || stylePresets["darkPink"];
		return console.log.bind(null, "%c" + label, _preset);
	};

	class Logger {
		constructor({ label = "", stylePreset }) {
			this.label = label;
			this.stylePreset = stylePreset;
			this.logg = loggFactory({ label, stylePreset });
		}
	}
	const label = "Burlington Helper";
	const logg = new Logger({ label, stylePreset: "lightBlue" }).logg;

	const keyEventHandlers = {};
	const defaultKeyCallback = ({ key, on }) => {
		console.log(`The "${key}" key has just fired an "on${on}" event.`);
	};
	const handlePress = (
		{ key = " ", keyCode = "", charCode = "", on = "keyup", documentElem },
		callback
	) => {
		callback = callback || defaultKeyCallback;
		on = on.toLowerCase();
		key = key.toLowerCase();
		if (!keyEventHandlers[on]) {
			keyEventHandlers[on] = {};
		}
		keyEventHandlers[on][key] = callback;
		const _doc = documentElem || document;
		_doc.body["on" + on] = ev => {
			const handlers = keyEventHandlers[on];

			for (let [_key, callback] of Object.entries(handlers)) {
				if (_key.toLowerCase() === ev.key.toLowerCase()) {
					callback({
						on,
						key: ev.key,
						keyCode: ev.keyCode,
						charCode: ev.charCode,
						ev
					});
				}
			}
		};
	};

	let pageIsHandled = false;

	let store = {};
	let selectedItem = {};
	let selectedIndex = -1;
	const setStore = newVal => {
		store = newVal;
		logg("Store was set to: ", newVal);
	};
	const setSelected = (config = {}) => {
		const { i, move, item } = config;
		if (!i && i !== 0 && !move && !item) return null;

		const prevSelected = selectedItem;

		if (i >= 0) {
			selectedIndex = i;
			selectedItem = store[i];
		} else if (move) {
			let nextIndex = 0;
			if (["next", "forward"].includes(move)) {
				if (selectedIndex + 1 >= store.length) {
					nextIndex = 0;
				} else {
					nextIndex = selectedIndex + 1;
				}
			} else if (["prev", "back"].includes(move)) {
				if (selectedIndex - 1 <= -1) {
					nextIndex = store.length - 1;
				} else {
					nextIndex = selectedIndex - 1;
				}
			}
			selectedIndex = nextIndex;
			selectedItem = store[nextIndex];
		} else if (item) {
			const _i = store.indexOf(item);
			if ((_i && _i > -1) || _i === 0) {
				selectedIndex = _i;
				selectedItem = store[_i];
			}
		}
		onStateChange(selectedItem, prevSelected);
		return selectedItem;
	};
	let onStateChange = (selectedItem, prevSelectedItem) => {
		logg("Selected Item: ", selectedItem);
	};

	handlePress({ key: "ArrowUp" }, () => {
		if (selectedItem && selectedItem.domElem)
			selectedItem.domElem.style = {};
		setSelected({ move: "next" });
	});
	handlePress({ key: "ArrowDown" }, () => {
		if (selectedItem & selectedItem.domElem)
			selectedItem.domElem.style = {};
		setSelected({ move: "prev" });
	});
	handlePress({ key: "enter" }, ({ ev }) => {
		ev.preventDefault();
		logg(ev);
		if (selectedItem) removeStyles(selectedItem.domElem);
		logg("Clicking on ", selectedItem.details);
		selectedItem.domElem.click();
	});
	handlePress({ key: "tab" }, ({ ev }) => {
		ev.preventDefault();
		logg(ev);
		if (selectedItem) removeStyles(selectedItem.domElem);
		logg("Clicking on ", selectedItem.details);
		selectedItem.domElem.click();
	});

	const handlePage = () => {
		if (document.readyState !== "complete") return;
		debugger;
		pageIsHandled = true;

		const currentURL = window.location.href;
		if (currentURL.endsWith("app.burlingtonenglish.com/")) {
			/* Homepage */
			logg("Homepage. clicking on 'School Management'.");
			const btns = document.querySelectorAll(".MuiButtonBase-root");
			const mainBtns = [...btns].slice(2);
			let schoolManagementBtn;
			mainBtns.forEach((btn, i) => {
				if (i + 1 >= mainBtns.length) {
					schoolManagementBtn = btn;
					schoolManagementBtn.style.opacity = 1;
				} else {
					btn.style.opacity = 0.2;
				}
			});
			window.requestAnimationFrame(() => {
				raise(schoolManagementBtn, {
					scale: 1.5,
					boxShadow: "black -2px 4px 4px"
				});
			});
			setTimeout(() => {
				schoolManagementBtn.click();
			}, 1000);
			return;
		}

		if (currentURL.endsWith("BESMZ/TeacherDashboard/")) {
			const isScheduler = document.querySelector("#scheduler-view");
			if (!isScheduler) {
				const myCalendarBtn = document.querySelectorAll(
					".teacher-dashboard-mycalendar.btn"
				)[0];
				if (myCalendarBtn) {
					logg("Teacher's dashboard. Clicking on 'My Calendar'. ");
					myCalendarBtn.style.backgroundColor = DARK_PINK;
					raise(myCalendarBtn);

					setTimeout(() => {
						myCalendarBtn.click();
					}, 1000);
					return;
				}
				return;
			}
			logg("Scheduler view / My Calender");
			const lessonBtn = document.querySelector(
				"#attendance-open-topic-lesson-btn"
			);
			if (!lessonBtn) {
				logg(
					"Calendar page. Use the ArrowUp and ArrowDown keys to select a lesson. Hit Enter or Tab to enter the selected lesson. "
				);
				const handleLessonChange = selectedLesson => {
					if (!selectedLesson) {
						logg(
							"handleLessonChange() was called without a selectedLesson.."
						);
						return null;
					}
					const { details, domElem, i } = selectedLesson;
					logg("selected lesson: ", i, details || domElem);
					if (!domElem) return;
					raise(domElem);
					domElem.scrollIntoView({
						behavior: "smooth",
						block: "center",
						inline: "center"
					});
				};

				onStateChange = handleLessonChange;

				const clickableNumPupils = document.querySelectorAll(
					".badge-clickable"
				);
				const items = [...clickableNumPupils].map((domElem, i) => {
					const details = domElem.parentElement.title;
					return { domElem, details, i };
				});
				setStore(items);
				setSelected({ i: 0 });
			} else {
				logg(
					`Attendance popup. 
						Use the ArrowUp and ArrowDown keys to select either the lesson button or the Close button. 
						Hit Enter or Tab to execute your selection.`
				);
				const modal = document.querySelector(
					".attendance-main.attendance-course-main"
				);
				modal.style.overflow = "visible";

				onStateChange = selectedBtn => {
					raise(selectedBtn.domElem);
					logg(
						"selectedBtn : ",
						`[${selectedBtn.i}]: `,
						selectedBtn.title
					);
				};
				const pupils = document.querySelectorAll(
					"tbody>tr[data-id]>td:first-child>div"
				);

				const closeBtn = document.querySelector(
					".attendance-btn.attendance-footer-cancel"
				);
				const items = [lessonBtn, ...pupils, closeBtn].map(
					(domElem, i, _items) => {
						const title =
							i === 0
								? "lessonBtn"
								: i === _items.length - 1
								? "closeBtn"
								: `Pupil #${i}`;
						return { domElem, title, i };
					}
				);

				setStore(items);
				logg("store: ", store);
				setSelected({ i: 0 });
			}
		}

		const iframe = document.querySelector("iframe");
		const innerDoc =
			iframe.contentDocument || iframe.contentWindow.document;

		handlePress({ key: "ArrowUp", documentElem: innerDoc }, () => {
			if (selectedItem) removeStyles(selectedItem);
			pageIsHandled = true;
			setSelected({ move: "next" });
		});
		handlePress({ key: "ArrowDown", documentElem: innerDoc }, () => {
			if (selectedItem) removeStyles(selectedItem);
			pageIsHandled = true;
			setSelected({ move: "prev" });
		});
		handlePress({ key: "enter", documentElem: innerDoc }, ({ ev }) => {
			ev.preventDefault();
			if (selectedItem) removeStyles(selectedItem);
			pageIsHandled = false;
			selectedItem.click();
		});
		handlePress({ key: "tab", documentElem: innerDoc }, ({ ev }) => {
			ev.preventDefault();
			if (selectedItem) removeStyles(selectedItem);
			pageIsHandled = false;
			selectedItem.click();
		});

		const handleSelection = (selectedElem, prevSelected) => {
			prevSelected.style = {};
			if (!selectedElem) {
				logg("handleSelection() was called without a selectedElem..");
				return null;
			}
			const { className, nodeName, id } = selectedElem;
			logg(`Selected DOM element: ${nodeName}${id}.${className}`);
			selectedElem.style.backgroundColor = DARK_PINK;
			selectedElem.style.zIndex = 9000000;
			raise(selectedElem);
			selectedElem.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center"
			});
		};

		onStateChange = handleSelection;
		logg(
			"Topic lesson. Use the ArrowUp and ArrowDown keys to cycle between clickable items (play-sound buttons, show/hide answer buttons, in-tab navigation buttons, tabs). Hit Enter/Tab to click the item."
		);

		const playIcons = innerDoc.querySelectorAll(".sound-btn");
		logg("playIcons: ", playIcons);
		const toggleIcons = document.querySelectorAll(".toggle-icon");
		logg("toggleIcons: ", toggleIcons);
		const toggleTextIcons = innerDoc.querySelectorAll(".toggle-text-icon");
		logg("toggleTextIcons: ", toggleTextIcons);

		const answerBtns = innerDoc.querySelectorAll(".btn-label");
		logg(" answerBtns: ", answerBtns);

		const inScreenNavs = innerDoc.querySelectorAll(
			"#screens-next-prev-nav i"
		);
		logg("inScreenNavs: ", inScreenNavs);

		const bottomPaginations = innerDoc.querySelectorAll(
			".paging-wrapper a"
		);
		logg("bottomPaginations: ", bottomPaginations);

		let tabs = innerDoc.querySelectorAll(".tabs-wrapper .tab");
		if (tabs.length <= 0)
			tabs = innerDoc.querySelectorAll(".tab-container .tab");
		if (tabs.length <= 0) tabs = innerDoc.querySelectorAll("li.tab");
		const upperTabs = tabs;
		logg(" upperTabs: ", upperTabs);

		if (
			!upperTabs ||
			upperTabs.length <= 0 ||
			!bottomPaginations ||
			bottomPaginations.length <= 0
		) {
			pageIsHandled = false;
			return;
		}

		const clickables = [
			...playIcons,
			...answerBtns,
			...inScreenNavs,
			...bottomPaginations,
			...upperTabs
		];

		setStore(clickables);
		setSelected({ i: 0 });
		pageIsHandled = true;
	};

	handlePage();
	const refreshInterval = setInterval(() => {
		pageIsHandled ? "" : handlePage();
	}, 3000);
})();
