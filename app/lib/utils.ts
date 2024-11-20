export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
};

export const formatUnits = (units: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(units);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatLargeNumbers = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
};

export interface IFilters {
  type?: { $in: string[] };
  "services.name"?: { $in: string[] };
  "listing.price.price"?: { $gte?: number; $lte?: number };
  "attributes.totalSurface"?: { $gte?: number; $lte?: number };
  "agent.firstName"?: RegExp;
}

export const constructFilters = (
  searchParams: URLSearchParams
): Record<string, any> => {
  const filters: Record<string, any> = {};

  if (searchParams.has("services")) {
    const services = searchParams.get("services")?.split(",") || [];
    filters["services.name"] = { $in: services };
  }

  if (searchParams.has("types")) {
    const types = searchParams.get("types")?.split(",") || [];
    filters["type"] = { $in: types };
  }

  if (searchParams.has("price")) {
    const [min, max] = searchParams.get("price")?.split("-") || [];
    filters["listing.price.price"] = {
      ...(min ? { $gte: parseFloat(min) } : {}),
      ...(max ? { $lte: parseFloat(max) } : {}),
    };
  }

  if (searchParams.has("meters")) {
    const [min, max] = searchParams.get("meters")?.split("-") || [];
    filters["attributes.totalSurface"] = {
      ...(min ? { $gte: parseFloat(min) } : {}),
      ...(max ? { $lte: parseFloat(max) } : {}),
    };
  }

  if (searchParams.has("agent")) {
    const agent = searchParams.get("agent") || "";
    if (agent.trim()) {
      filters["$or"] = [
        { "agent.firstName": new RegExp(agent, "i") },
        { "agent.lastName": new RegExp(agent, "i") },
      ];
    }
  }

  return filters;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
