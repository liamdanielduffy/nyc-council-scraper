export function select(selector: string): HTMLElement {
  return document.querySelector(selector) as HTMLElement;
}

export function childrenOf(selector: string): HTMLElement[] {
  return [...select(".rcbList").children] as HTMLElement[];
}

export function elementWithText(elements: HTMLElement[], text: string): HTMLElement {
  return elements.filter((el) => el.textContent === text)[0];
}