import { AudioClip, resources } from 'cc';

import { system } from './system';

export const playSound = (name: string): void => {
	resources.load(`sound/${name}`, (err, sound: AudioClip) => {
		if (!err) {
			system.audioSource.playOneShot(sound);
		}
	});
};
