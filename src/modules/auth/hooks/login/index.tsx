import { RootStackScreenProps } from "../../../../shared";

type UseLoginControllerProps = {
  navigation: RootStackScreenProps<"Home">["navigation"];
};

/*
  ! todo:
  - [ ] install react-hook-form
  - [ ] do logic to handle with form using react-hook-form
  - [ ] install supabase client
  - [ ] implement authentication with supabase
  - [ ] install lib to handle with async storage
  - [ ] save token in async storage
  - [ ] create a hook to handle with authentication
  - [ ] install libs to handle with tests
  - [ ] create tests
  - [ ] move types to separate file
*/
export const useLoginController = ({ navigation }: UseLoginControllerProps) => {
  return {
    onSubmit: () => navigation.push("Home"),
  };
};
