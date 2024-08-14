import BottomMenu from "../../components/BottomMenu/BottomMenu";
import {SafeAreaView} from "react-native-safe-area-context";
import {RecommendationsStyle} from "./Recommendations.style";

const Recommendations: React.FC = () => {
    return (
        <SafeAreaView style={RecommendationsStyle.container}>
            <BottomMenu/>
        </SafeAreaView>
    );
};


export default Recommendations;
