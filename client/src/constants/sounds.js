import { Howl, Howler } from "howler";
const SFX_DIR = "/sfx/";

const mainClickSound = new Howl({
	src: [`${SFX_DIR}sound_ex_machina_Button_Tick.mp3`],
	volume: 0.5,
});

const attentionSound = new Howl({
	src: [`${SFX_DIR}app_alert_tone_024.mp3`],
	volume: 0.5,
});

export { mainClickSound, attentionSound };

// const mainClickSound = new Howl({
// 	src: ["/sfx/multimedia_button_click_029.mp3"],
// 	volume: 0.5,
// });
