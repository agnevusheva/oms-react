import { configApiService } from '$lib/services/configApi';
import type { MenuItemDTO } from './types';

export async function load(): Promise<{ items: Array<MenuItemDTO> }> {
	const items = await configApiService.getItems();
	return { items };
}
