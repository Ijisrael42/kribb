import { labelClass, sectionClass, TYPES } from '@/constants';
import { shadow } from '@/constants/modal-filter';
import { FormState } from '@/types';
import { Text, TouchableOpacity, View } from 'react-native';

interface ChipsProps {
    handleUpdateForm: (fields: Partial<FormState>) => void;
    form: FormState
}

const Chips = ({ handleUpdateForm, form }: ChipsProps) => {
    return (
        <View className={sectionClass}>
            <Text className={labelClass}>
                Property Type
            </Text>
            <View className='flex-row flex-wrap gap-2'>
                {TYPES.map((item) => (
                    <TouchableOpacity
                        key={item}
                        onPress={() => handleUpdateForm({ type: item })}
                        className={`px-4 py-2 rounded-full border ${form.type === item ?
                            'bg-blue-600 border-blue-600' :
                            'border-gray-200 bg-white'
                            }`}
                        style={shadow}
                    >
                        <Text className={`text-sm font-medium capitalize ${form.type === item ? 'text-white' : 'text-gray-600'}`}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default Chips