import worker from '../src/worker';

const { MY_KV } = getMiniflareBindings();

it('responds with url', async () => {
	const req = new Request('http://localhost/?name=hoge');
	const res = await worker.fetch(req, { MY_KV }, {} as ExecutionContext);
	expect(await res.text()).toBe('name: hoge, count: 1');
});

it('If name argument is not passed, responds 400 status', async () => {
	const req = new Request('http://localhost/');
	const res = await worker.fetch(req, { MY_KV }, {} as ExecutionContext);
	expect(await res.status).toBe(400);
});
