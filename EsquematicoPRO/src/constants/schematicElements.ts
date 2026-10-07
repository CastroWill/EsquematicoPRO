export type SchematicElement = {
  id: string;
  type: "label";
  text: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FocusRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const schematicElements: SchematicElement[] = [
  {
    id: "m1a-car",
    type: "label",
    text: "M1A CAR",
    page: 1,
    x: 239,
    y: 23.5,
    width: 60,
    height: 12,
  },
];

export function getFocusRegion(
  element: SchematicElement,
  margin = 20,
): FocusRegion {
  return {
    x: element.x - margin,
    y: element.y - margin,
    width: element.width + margin * 2,
    height: element.height + margin * 2,
  };
}
