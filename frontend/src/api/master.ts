const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export type MasterState = {
  id: string;
  name: string;
  code: string | null;
  countryName: string | null;
  active: boolean;
};

export type MasterDistrict = {
  id: string;
  name: string;
  active: boolean;
  state: MasterState;
};

export type MasterTaluka = {
  id: string;
  name: string;
  active: boolean;
  district: MasterDistrict;
};

export type MasterCity = {
  id: string;
  name: string;
  active: boolean;
  state: MasterState;
  district: MasterDistrict | null;
  taluka: MasterTaluka | null;
};

async function fetchMasterData<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "मास्टर डेटा मिळवताना त्रुटी आली."
    );
  }

  return result;
}

export async function getStates(): Promise<MasterState[]> {
  return fetchMasterData<MasterState[]>("/master/states");
}

export async function getDistricts(
  stateId: string
): Promise<MasterDistrict[]> {
  return fetchMasterData<MasterDistrict[]>(
    `/master/states/${stateId}/districts`
  );
}

export async function getTalukas(
  districtId: string
): Promise<MasterTaluka[]> {
  return fetchMasterData<MasterTaluka[]>(
    `/master/districts/${districtId}/talukas`
  );
}

export async function getCities(
  talukaId: string
): Promise<MasterCity[]> {
  return fetchMasterData<MasterCity[]>(
    `/master/talukas/${talukaId}/cities`
  );
}

export type MasterEducationLevel = {
  id: string;
  name: string;
  displayOrder: number;
  active: boolean;
};

export type MasterEducationStream = {
  id: string;
  name: string;
  displayOrder: number;
  active: boolean;
};

export async function getEducationLevels(): Promise<
  MasterEducationLevel[]
> {
  return fetchMasterData<MasterEducationLevel[]>(
    "/master/education-levels",
  );
}

export async function getEducationStreams(): Promise<
  MasterEducationStream[]
> {
  return fetchMasterData<MasterEducationStream[]>(
    "/master/education-streams",
  );
}