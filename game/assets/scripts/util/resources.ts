import { AudioClip, instantiate, Node, Prefab, resources } from 'cc';

import { delay } from './helper';
import { system } from './system';

export const playSound = (name: string, volume = 1, dimSpeed = 0.005): void => {
	resources.load(`sound/${name}`, async (err, sound: AudioClip) => {
		if (!err) {
			system.audioSource.stop();
			system.audioSource.clip = sound;
			system.audioSource.volume = volume;
			system.audioSource.loop = true;
			system.audioSource.play();

			for (let i = 0; i < volume; i += 0.01) {
				system.audioSource.volume = i;
				await delay(dimSpeed);
			}
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

	playSound(name, volume);
};

export const playSoundOnce = (name: string, volume = 1): void => {
	resources.load(`sound/${name}`, (err, sound: AudioClip) => {
		if (!err) {
			system.audioSource.playOneShot(sound, volume);
		}
	});
};

export const stopAndPlayOnce = (name: string, volume = 1): void => {
	system.audioSource.stop();

	resources.load(`sound/${name}`, (err, sound: AudioClip) => {
		if (!err) {
			system.audioSource.stop();
			system.audioSource.playOneShot(sound, volume);
		}
	});
};

export const instantiatePrefab = (uri: string): Promise<Node> => {
	return new Promise((resolve, reject) => {
		resources.load(uri, (err, prefab: Prefab) => {
			if (err) {
				reject(err);
			} else {
				resolve(instantiate(prefab));
			}
		});
	});
};
