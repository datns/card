import { animation, AnimationClip, easing, Quat, Vec3 } from 'cc';

const { HierarchyPath } = animation;

type EasingMethods = keyof typeof easing;

interface FragmentDetail {
	time: number;
	value: unknown;
	easing?: EasingMethods;
}

const buildFragments = (
	keys: number,
	scale: number,
	fragments: Array<FragmentDetail>,
) => {
	return {
		keys: fragments.map((fragment) => (fragment.time / 60) * scale),
		data: {
			keys,
			values: fragments.map((fragment) => fragment.value),
			easingMethods: fragments.map((fragment) => fragment.easing || 'linear'),
		},
	};
};

const defaultExpo = new Vec3(420, 0, 0);
const defaultFrom = new Vec3(425, -232, 0);
const defaultTo = new Vec3(0, -360, 0);
export const reveal = (
	expo: Vec3 = defaultExpo,
	from: Vec3 = defaultFrom,
	to: Vec3 = defaultTo,
	scale = 2,
): AnimationClip => {
	const mid = new Vec3(from.x - 15, from.y + 50, from.z);
	const clip = new AnimationClip();
	clip.name = 'card-reveal';
	clip.duration = scale;

	const positionFragments = buildFragments(0, scale, [
		{
			time: 0,
			value: from,
			easing: 'linear',
		},
		{
			time: 6,
			value: mid,
			easing: 'linear',
		},
		{
			time: 30,
			value: expo,
			easing: 'quadIn',
		},
		{
			time: 50,
			value: expo,
			easing: 'quadIn',
		},
		{
			time: 60,
			value: to,
			easing: 'quadIn',
		},
	]);
	const scaleFragments = buildFragments(1, scale, [
		{
			time: 0,
			value: new Vec3(0.22, 0.22, 1),
			easing: 'linear',
		},
		{
			time: 30,
			value: new Vec3(0.5, 0.5, 1),
			easing: 'linear',
		},
		{
			time: 50,
			value: new Vec3(0.5, 0.5, 1),
			easing: 'quadIn',
		},
		{
			time: 60,
			value: new Vec3(0.3, 0.3, 1),
			easing: 'quadIn',
		},
	]);
	const rotateFragments = buildFragments(2, scale, [
		{
			time: 0,
			value: Quat.fromEuler(new Quat(), 90, 90, 91),
			easing: 'linear',
		},
		{
			time: 30,
			value: Quat.fromEuler(new Quat(), 0, 0, 0),
			easing: 'quadIn',
		},
		{
			time: 50,
			value: Quat.fromEuler(new Quat(), 0, 0, 0),
			easing: 'quadIn',
		},
		{
			time: 60,
			value: Quat.fromEuler(new Quat(), 0, 0, -5),
			easing: 'quadIn',
		},
	]);
	const activeFragments = buildFragments(3, scale, [
		{
			time: 0,
			value: true,
		},
		{
			time: 14.85,
			value: false,
		},
	]);
	clip.keys = [
		positionFragments.keys,
		scaleFragments.keys,
		rotateFragments.keys,
		activeFragments.keys,
	];
	clip.curves = [
		{
			modifiers: ['position'],
			data: positionFragments.data,
		},
		{
			modifiers: ['scale'],
			data: scaleFragments.data,
		},
		{
			modifiers: ['rotation'],
			data: rotateFragments.data,
		},
		{
			modifiers: [new HierarchyPath('back'), 'active'],
			data: activeFragments.data,
		},
	];

	return clip;
};

export const cardClips = {
	reveal,
};
