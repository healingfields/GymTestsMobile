import { RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";

interface HomeProps{
    route: RouteProp<{params: {token: string}}, 'params'>;
}

function Home({route}: HomeProps): React.JSX.Element{
    const {token} = route.params;
    return (
        <View>
            <Text>
                {token}
            </Text>
        </View>
    )
}

export default Home;