const knownSegments = ["dashboard", "products", "create", "update"] as const;
type KnownSegment = (typeof knownSegments)[number];

export const isKnownSegment = (segment: string): segment is KnownSegment => {
  return (knownSegments as readonly string[]).includes(segment);
};
