import { test, expect } from '@playwright/test';
import {Omnichannel} from '../src/API/Omnichannel';

test('Test using token from API', async ({ request }) => {

    await Omnichannel.uploadFile(request, "./src/API/test.json");

});