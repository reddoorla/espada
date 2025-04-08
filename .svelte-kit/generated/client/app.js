export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9')
];

export const server_loads = [0];

export const dictionary = {
		"/[[preview=preview]]/about": [~4],
		"/[[preview=preview]]/contact": [~5],
		"/[[preview=preview]]/development-and-investments": [~6],
		"/[[preview=preview]]/login": [~7],
		"/[[preview=preview]]/property-management": [~8],
		"/slice-simulator": [9],
		"/[[preview=preview]]": [~2],
		"/[[preview=preview]]/[uid]": [~3]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.js';