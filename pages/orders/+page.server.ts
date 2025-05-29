import { configApiService } from '$lib/services/configApi';
import type { TableDTO } from './types';

export async function load(): Promise<{ tables: Array<TableDTO> }> {
	const tables = await configApiService.getTables();
	return { tables };
}
