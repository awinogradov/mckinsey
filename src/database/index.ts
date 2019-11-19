import { join } from 'path';
import { outputJSON, readJSON } from 'fs-extra';

import { DBNormalized, FSReflection, ReportReflection } from '../typings';

const dbFilePath = join(process.cwd(), 'data', 'reports.json');

export let db: DBNormalized = {
  reports: {},
};

export async function seed() {
  const reflection: FSReflection = await readJSON(dbFilePath);
  db = reflection.elements.reduce((acc: DBNormalized, curr: ReportReflection) => {
    acc.reports[curr.payload.reportId] = curr;

    return acc;
  }, db);

  console.log('🚀 Database started!');

  return db;
}

export function update(data: DBNormalized) {
  db = data;
}

process.on('SIGINT', async () => {
  console.log('Saving db reflection...');

  const reflection: FSReflection = {
    size: Object.keys(db.reports).length,
    elements: Object.values(db.reports)
  };

  await outputJSON(dbFilePath, reflection, {
    spaces: 2
  }).catch(err => console.error(err));

  console.log('✅ Saved!');

  process.exit();
});
