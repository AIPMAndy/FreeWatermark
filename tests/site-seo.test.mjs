import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('brand, official services and structured metadata are grounded',()=>{
  const h=read('index.html');
  const json=h.match(/<script type="application\/ld\+json">(.+?)<\/script>/)?.[1];
  assert.ok(json);
  const data=JSON.parse(json);
  assert.equal(data['@type'],'WebApplication');
  assert.equal(data.publisher.url,'https://www.a6no1.cn/');
  for(const link of ['https://metaver.vip/','https://metaver.vip/services','https://www.a6no1.cn/','AIPMAndy'])assert.ok(h.includes(link),link);
});
test('SEO index points to one real public app entry',()=>{
  assert.match(read('robots.txt'),/FreeWatermark\/sitemap\.xml/);
  assert.match(read('sitemap.xml'),/<loc>https:\/\/aipmandy\.github\.io\/FreeWatermark\/<\/loc>/);
});
test('reduced-motion controls preserved',()=>{
  assert.match(read('styles.css'),/prefers-reduced-motion:reduce/);
});
