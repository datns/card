import { AudioClip, resources } from 'cc';

import { delay } from './helper';
import { system } from './system';

export const playSound = (name: string, volume = 1): void => {
	resources.load(`sound/${name}`, (err, sound: AudioClip) => {
		if (!err) {
			system.audioSource.clip = sound;
			system.audioSource.volume = volume;
			system.audioSource.play();
		}
	});
};

export const switchSound = async (
	name: string,
	volume = 1,
	dimSpeed = 100,
): Promise<void> => {
	for (let i = volume; i > 0; i -= 0.005) {
		system.audioSource.volume = i;
		await delay(dimSpeed);
	}

	system.audioSource.stop();
	playSound(name, volume);

	for (let i = 0; i < volume; i += 0.01) {
		system.audioSource.volume = i;
		await delay(dimSpeed);
	}
};

export const playSoundOnce = (name: string, volume = 1): void => {
	resources.load(`sound/${name}`, (err, sound: AudioClip) => {
		if (!err) {
			system.audioSource.playOneShot(sound, volume);
		}
	});
};
