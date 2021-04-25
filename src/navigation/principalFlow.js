import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Movies from '../screens/movies';
import Hotel from '../screens/hotel';
    
const Tab = createBottomTabNavigator();
    
const PrincipalFlow = () => {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    const iconColor = focused ? 'silver' : '#f0edf6';
                    if (route.name === 'Inicio') {
                        return <Icon name={"movie"} type={"material-community"} color={iconColor} size={size} />;
                    }
                    if (route.name === 'Perfil') {
                        return <Icon name={'hote'} type={'font-awesome-5'} color={iconColor} size={size} />;
                    }
                    return(
                         <Icon name={'home'} type={'material-community'} color={iconColor} size={size} />
                    );
                },
            })}
            initialRouteName="Películas"
            headerMode='none'
        >
            <Tab.Screen name={"Películas"} component={Movies} />
            <Tab.Screen name={'Hotel'} component={Hotel} />
        </Tab.Navigator>
    );
};

export default PrincipalFlow;
