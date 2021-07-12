import { ZodError } from "zod";

export const customError = (error: Error, notification: any) => {
  if (error instanceof ZodError) {
    notification.show({
      message: error.issues[0].path + ": " + error.issues[0].message,
      success: false,
    });
  } else {
    notification.show({
      message: `An error has occured: ${error.name}`,
      success: false,
    });
  }
  setTimeout(() => notification.hide(), 5500);
};
