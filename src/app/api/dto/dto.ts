interface JsonDto {
  serialize<T>(): {
    string: string;
    dto: Record<string, T>;
  };
}

interface FormDataDto {
  serialize<T extends string | Blob | number | boolean>(): FormData;
}

class JsonDTO implements JsonDto {
  public serialize<T>() {
    const dto: Record<string, T> = Object.assign(this);

    Object.keys(dto).forEach((key) => {
      if (dto[key] === undefined) {
        delete dto[key];
      }
    });

    return {
      string: JSON.stringify(dto),
      dto: dto,
    };
  }
}

class formDataDTO implements FormDataDto {
  public serialize<T extends string | Blob | number | boolean>() {
    const dto: Record<string, T> = Object.assign(this);

    const formData = new FormData();
    Object.keys(dto).forEach((key) => {
      if (dto[key] === undefined) {
        delete dto[key];
      } else if (
        typeof dto[key] === "number" ||
        typeof dto[key] === "boolean"
      ) {
        formData.append(key, String(dto[key]));
      } else {
        formData.append(key, dto[key]);
      }
    });

    return formData;
  }
}

export {
  JsonDTO,
  formDataDTO 
};

export type {
  JsonDto,
  FormDataDto
};