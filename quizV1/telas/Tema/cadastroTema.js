import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Switch,
  Modal
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function Tema({ navigation, route }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    cor: '#4361EE',
    dificuldade: 'medium',
    isPublico: true,
    tempoPorPergunta: 30
  });

  const [modalCorVisible, setModalCorVisible] = useState(false);

  const coresDisponiveis = [
    { id: 1, codigo: '#4361EE', nome: 'Azul' },
    { id: 2, codigo: '#7209B7', nome: 'Roxo' },
    { id: 3, codigo: '#4CC9F0', nome: 'Azul Claro' },
    { id: 4, codigo: '#F72585', nome: 'Rosa' },
    { id: 5, codigo: '#10B981', nome: 'Verde' },
    { id: 6, codigo: '#F59E0B', nome: 'Laranja' }
  ];

  const dificuldades = [
    { id: 'easy', nome: 'Fácil', icon: 'smile' },
    { id: 'medium', nome: 'Médio', icon: 'meh' },
    { id: 'hard', nome: 'Difícil', icon: 'frown' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSalvar = () => {
    // Validações
    if (!formData.nome.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do tema');
      return;
    }

    if (!formData.descricao.trim()) {
      Alert.alert('Erro', 'Por favor, informe a descrição do tema');
      return;
    }

    // Simular salvamento
    Alert.alert(
      'Sucesso!',
      `Tema "${formData.nome}" cadastrado com sucesso!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );

    // Aqui você integraria com seu banco de dados
    console.log('Dados do tema:', formData);
  };

  const SelecionarCor = ({ cor, onPress, selecionada }) => (
    <TouchableOpacity
      style={[
        styles.corOption,
        { backgroundColor: cor.codigo },
        selecionada && styles.corSelecionada
      ]}
      onPress={() => onPress(cor)}
    >
      {selecionada && (
        <Ionicons name="checkmark" size={20} color="#FFFFFF" />
      )}
    </TouchableOpacity>
  );

  const DificuldadeOption = ({ dificuldade, selecionada, onPress }) => (
    <TouchableOpacity
      style={[
        styles.dificuldadeOption,
        selecionada && styles.dificuldadeSelecionada
      ]}
      onPress={() => onPress(dificuldade.id)}
    >
      <FontAwesome5 
        name={dificuldade.icon} 
        size={20} 
        color={selecionada ? '#FFFFFF' : '#4361EE'} 
      />
      <Text style={[
        styles.dificuldadeText,
        selecionada && styles.dificuldadeTextSelecionado
      ]}>
        {dificuldade.nome}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Tema</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card do Formulário */}
        <View style={styles.formCard}>
          {/* Nome do Tema */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome do Tema *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Programação Web"
              placeholderTextColor="#94A3B8"
              value={formData.nome}
              onChangeText={(text) => handleInputChange('nome', text)}
            />
          </View>

          {/* Descrição */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Descrição *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva o tema..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              value={formData.descricao}
              onChangeText={(text) => handleInputChange('descricao', text)}
            />
          </View>

          {/* Cor do Tema */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Cor do Tema</Text>
            <TouchableOpacity 
              style={styles.corSelector}
              onPress={() => setModalCorVisible(true)}
            >
              <View style={[styles.corPreview, { backgroundColor: formData.cor }]} />
              <Text style={styles.corSelectorText}>
                {coresDisponiveis.find(c => c.codigo === formData.cor)?.nome || 'Selecionar cor'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Dificuldade */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Dificuldade</Text>
            <View style={styles.dificuldadeContainer}>
              {dificuldades.map(dificuldade => (
                <DificuldadeOption
                  key={dificuldade.id}
                  dificuldade={dificuldade}
                  selecionada={formData.dificuldade === dificuldade.id}
                  onPress={handleInputChange}
                />
              ))}
            </View>
          </View>    
        </View>

        {/* Botões de Ação */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.btnSalvar}
            onPress={handleSalvar}
          >
            <Ionicons name="save" size={20} color="#FFFFFF" />
            <Text style={styles.btnSalvarText}>Salvar Tema</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnCancelar}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={20} color="#4361EE" />
            <Text style={styles.btnCancelarText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de Seleção de Cor */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCorVisible}
        onRequestClose={() => setModalCorVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecionar Cor</Text>
              <TouchableOpacity onPress={() => setModalCorVisible(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.coresGrid}>
              {coresDisponiveis.map(cor => (
                <SelecionarCor
                  key={cor.id}
                  cor={cor}
                  selecionada={formData.cor === cor.codigo}
                  onPress={(corSelecionada) => {
                    handleInputChange('cor', corSelecionada.codigo);
                    setModalCorVisible(false);
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#4361EE',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerRight: {
    width: 34, // Para manter o alinhamento
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CC9F0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  corSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
  },
  corPreview: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  corSelectorText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  dificuldadeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  dificuldadeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
  },
  dificuldadeSelecionada: {
    backgroundColor: '#4361EE',
    borderColor: '#4361EE',
  },
  dificuldadeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4361EE',
  },
  dificuldadeTextSelecionado: {
    color: '#FFFFFF',
  },
  configItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  configLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  configDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  tempoInput: {
    width: 80,
    textAlign: 'center',
  },
  actions: {
    gap: 12,
  },
  btnSalvar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#4361EE',
    borderRadius: 12,
    padding: 16,
  },
  btnSalvarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  btnCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4361EE',
    borderRadius: 12,
    padding: 16,
  },
  btnCancelarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4361EE',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 25,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CC9F0',
  },
  coresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'center',
  },
  corOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  corSelecionada: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
});