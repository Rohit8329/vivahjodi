const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export type OccupationCategory = {
  id: string;
  name: string;
  displayOrder: number;
  active: boolean;
};

export type OccupationMaster = {
  id: string;
  name: string;
  displayOrder: number;
  active: boolean;
  category: OccupationCategory;
};

export type EmploymentType = {
  id: string;
  code: string;
  name: string;
  displayOrder: number;
  active: boolean;
};

export type EmploymentSector = {
  id: string;
  code: string;
  name: string;
  displayOrder: number;
  active: boolean;
};

async function getMasterData<T>(
  endpoint: string,
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "मास्टर माहिती मिळवताना त्रुटी आली.",
    );
  }

  return result;
}

export async function getOccupationCategories(): Promise<
  OccupationCategory[]
> {
  return getMasterData<OccupationCategory[]>(
    "/master/occupation-categories",
  );
}

export async function getOccupationsByCategory(
  categoryId: string,
): Promise<OccupationMaster[]> {
  return getMasterData<OccupationMaster[]>(
    `/master/occupation-categories/${categoryId}/occupations`,
  );
}

export async function getAllOccupations(): Promise<OccupationMaster[]> {
  return getMasterData<OccupationMaster[]>("/master/occupations");
}



export async function getEmploymentTypes(): Promise<
  EmploymentType[]
> {
  return getMasterData<EmploymentType[]>(
    "/master/employment-types",
  );
}

export async function getEmploymentSectors(): Promise<
  EmploymentSector[]
> {
  return getMasterData<EmploymentSector[]>(
    "/master/employment-sectors",
  );
}