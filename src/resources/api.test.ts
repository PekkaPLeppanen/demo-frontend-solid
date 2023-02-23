import {afterEach, beforeEach, expect, test} from 'vitest';
import {getData} from '@/resources/api';

type ResponseMock = {
	foo: string
}

const fetchMock = vi.fn();

describe('Api', () => {

	beforeEach(() => {
		global.fetch = fetchMock;
		vi.clearAllMocks();
	});

	afterEach(() => {
		fetchMock.mockRestore();
	});

	describe('#getData', () => {
		test('ok response', async () => {
			const responseMock: ResponseMock = {
				foo: 'bar',
			};

			fetchMock.mockResolvedValueOnce({
				status: 200,
				ok: true,
				json: () => Promise.resolve(responseMock)
			} as unknown as Response);
			const response = await getData<ResponseMock>('https://example.com/links');

			expect(response).toEqual(responseMock);
			expect(fetchMock).toHaveBeenCalledTimes(1);
			expect(fetchMock).toHaveBeenCalledWith('https://example.com/links');
		});
		test('failed response', async () => {
			fetchMock.mockResolvedValueOnce({
				status: 401,
				ok: false,
				statusText: 'Failed mock response',
				json: () => Promise.resolve({})
			} as unknown as Response);

			expect.assertions(3);
			try {
				await getData<ResponseMock>('https://example.com/links');
			} catch (e) {
				expect(e).toEqual('Failed mock response');
			}

			expect(fetchMock).toHaveBeenCalledTimes(1);
			expect(fetchMock).toHaveBeenCalledWith('https://example.com/links');
		});
	});

});
