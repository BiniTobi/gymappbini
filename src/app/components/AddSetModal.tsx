import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddSetModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (weight: number, reps: number, tenRm: number) => void;
}

export const AddSetModal = ({ visible, onClose, onSave }: AddSetModalProps) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [tenRm, setTenRm] = useState('');

  const handleSave = () => {
    onSave(
      parseFloat(weight) || 0,
      parseInt(reps) || 0,
      parseFloat(tenRm) || 0
    );
    setWeight('');
    setReps('');
    setTenRm('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-lg p-6 w-80">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Add New Set</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1">Weight (kg)</Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
              placeholder="0"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1">Reps</Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg"
              keyboardType="numeric"
              value={reps}
              onChangeText={setReps}
              placeholder="0"
            />
          </View>

          <View className="mb-6">
            <Text className="text-gray-600 mb-1">10RM</Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg"
              keyboardType="numeric"
              value={tenRm}
              onChangeText={setTenRm}
              placeholder="0"
            />
          </View>

          <TouchableOpacity
            onPress={handleSave}
            className="bg-yellow-400 py-3 rounded-lg items-center"
          >
            <Text className="text-black font-bold">Save Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};