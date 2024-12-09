
export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&size=650,450&z=14&l=map`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch address!');
  }

  const data = await response.json();
  const address=data.display_name;
  return address;
}