const nameRegex = /^[A-Za-zÀ-ú\s]+(([',. -][A-Za-zÀ-ú ])?[A-Za-zÀ-ú]*)*$/;

export const validators = {
  name: (name: string) => nameRegex.test(name),
};

export const checkValue = (value: any) => {
  return value || '-';
};
