import { dirname } from 'path';

import { lstat, link } from '../fs';

import linkAtomic from './linkAtomic';
import mkdirs from './mkdirs';
import pathExists from './pathExists';

/**
 * Creates a hard file link, making all folders required to satisfy the given file path. test test test
 * @function ensureLink
 * @memberof fsn/nextra
 * @param source The source path of the file
 * @param destination The destination path of the file
 * @param atomic Whether the operation should run atomically
 */
/**
 * Creates a hard file link, making all folders required to satisfy the given file path.
 * @function createLink
 * @memberof fsn/nextra
 * @param source The source path of the file
 * @param destination The destination path of the file
 * @param atomic Whether the operation should run atomically
 */
export default async function createLink(source: string, destination: string, atomic: boolean = false): Promise<void> {
	if (await pathExists(destination)) return;
	await lstat(source);

	await mkdirs(dirname(destination));

	const linkMethod = atomic ? linkAtomic : link;
	await linkMethod(source, destination);
}
