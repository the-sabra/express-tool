import path from 'path';

const rootDir = path.dirname(path.dirname(new URL(import.meta.url).pathname));

export default rootDir;
