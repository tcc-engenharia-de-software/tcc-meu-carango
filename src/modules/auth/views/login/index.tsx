import { Text, TextInput, TouchableOpacity, View } from "react-native";

type LoginViewProps = {
  onSubmit: () => void;
};

export const LoginView = ({ onSubmit }: LoginViewProps) => (
  <View className="bg-white flex flex-1 px-4 pt-14">
    <Text className="text-6xl mb-8">Entrar</Text>

    <TextInput
      className="border-black border-2 text-3xl w-full px-4 py-2 mb-4"
      placeholder="Email"
      testID="email-input"
    />

    <TextInput
      className="border-black border-2 text-3xl w-full px-4 py-2 mb-4"
      placeholder="Senha"
      secureTextEntry={true}
      testID="password-input"
    />

    <TouchableOpacity
      className="bg-black py-2"
      onPress={onSubmit}
      testID="submit-button"
    >
      <Text className="text-3xl text-white text-center">Entrar</Text>
    </TouchableOpacity>
  </View>
);
