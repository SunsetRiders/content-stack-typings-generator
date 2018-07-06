
export function toPascalCase(name: string): string {
  const names = name.split('_');
  const pascalNames = names.map(x => x.slice(0, 1).toUpperCase() + (x.length > 1 ? x.slice(1) : ''));

  return pascalNames.join('');
}
