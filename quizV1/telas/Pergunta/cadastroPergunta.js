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
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function CadastroPergunta({ navigation, route }) {
  const [formData, setFormData] = useState({
    pergunta: '',
    tema: '',
    explicacao: '',
    alternativas: [
      { id: 1, texto: '', correta: false },
      { id: 2, texto: '', correta: false },
      { id: 3, texto: '', correta: false },
      { id: 4, texto: '', correta: false }
    ]
  });

  const [modalTemaVisible, setModalTemaVisible] = useState(false);

  const temasDisponiveis = [
    { id: 1, nome: 'Programação Web', cor: '#4361EE' },
    { id: 2, nome: 'Matemática', cor: '#7209B7' },
    { id: 3, nome: 'História', cor: '#4CC9F0' },
    { id: 4, nome: 'Ciências', cor: '#F72585' },
    { id: 5, nome: 'Geografia', cor: '#10B981' },
    { id: 6, nome: 'Inglês', cor: '#F59E0B' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAlternativaChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      alternativas: prev.alternativas.map(alt => 
        alt.id === id ? { ...alt, [field]: value } : alt
      )
    }));
  };

  const handleAlternativaCorreta = (id) => {
    setFormData(prev => ({
      ...prev,
      alternativas: prev.alternativas.map(alt => 
        alt.id === id 
          ? { ...alt, correta: true }
          : { ...alt, correta: false }
      )
    }));
  };

  const adicionarAlternativa = () => {
    if (formData.alternativas.length >= 4) {
      Alert.alert('Aviso', 'Máximo de 4 alternativas permitidas');
      return;
    }

    const novaId = Math.max(...formData.alternativas.map(a => a.id)) + 1;
    setFormData(prev => ({
      ...prev,
      alternativas: [
        ...prev.alternativas,
        { id: novaId, texto: '', correta: false }
      ]
    }));
  };

  const removerAlternativa = (id) => {
    if (formData.alternativas.length <= 2) {
      Alert.alert('Aviso', 'Mínimo de 2 alternativas necessárias');
      return;
    }

    setFormData(prev => ({
      ...prev,
      alternativas: prev.alternativas.filter(alt => alt.id !== id)
    }));
  };

  const validarFormulario = () => {
    if (!formData.pergunta.trim()) {
      Alert.alert('Erro', 'Por favor, digite a pergunta');
      return false;
    }

    if (!formData.tema) {
      Alert.alert('Erro', 'Por favor, selecione um tema');
      return false;
    }

    const alternativasPreenchidas = formData.alternativas.filter(alt => 
      alt.texto.trim() !== ''
    );

    if (alternativasPreenchidas.length < 2) {
      Alert.alert('Erro', 'É necessário pelo menos 2 alternativas preenchidas');
      return false;
    }

    const alternativaCorreta = formData.alternativas.find(alt => alt.correta);
    if (!alternativaCorreta) {
      Alert.alert('Erro', 'Selecione a alternativa correta');
      return false;
    }

    return true;
  };

  const handleSalvar = () => {
    if (!validarFormulario()) return;

    // Simular salvamento
    Alert.alert(
      'Sucesso!',
      'Pergunta cadastrada com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );

    console.log('Dados da pergunta:', formData);
  };

  const AlternativaItem = ({ alternativa, index }) => (
    <View style={styles.alternativaContainer}>
      <View style={styles.alternativaHeader}>
        <Text style={styles.alternativaLabel}>
          Alternativa {String.fromCharCode(65 + index)}
        </Text>
        <View style={styles.alternativaActions}>
          <TouchableOpacity 
            style={[
              styles.corretaButton,
              alternativa.correta && styles.corretaButtonSelecionada
            ]}
            onPress={() => handleAlternativaCorreta(alternativa.id)}
          >
            <Ionicons 
              name="checkmark" 
              size={16} 
              color={alternativa.correta ? '#FFFFFF' : '#4361EE'} 
            />
            <Text style={[
              styles.corretaButtonText,
              alternativa.correta && styles.corretaButtonTextSelecionada
            ]}>
              Correta
            </Text>
          </TouchableOpacity>
          
          {formData.alternativas.length > 2 && (
            <TouchableOpacity 
              style={styles.removerButton}
              onPress={() => removerAlternativa(alternativa.id)}
            >
              <Ionicons name="trash" size={16} color="#F72585" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <TextInput
        style={styles.alternativaInput}
        placeholder={`Digite a alternativa ${String.fromCharCode(65 + index)}...`}
        placeholderTextColor="#94A3B8"
        value={alternativa.texto}
        onChangeText={(text) => handleAlternativaChange(alternativa.id, 'texto', text)}
        multiline
      />
    </View>
  );

  const TemaOption = ({ tema }) => (
    <TouchableOpacity
      style={[
        styles.temaOption,
        { borderLeftColor: tema.cor }
      ]}
      onPress={() => {
        handleInputChange('tema', tema.nome);
        setModalTemaVisible(false);
      }}
    >
      <View style={[styles.temaCor, { backgroundColor: tema.cor }]} />
      <Text style={styles.temaNome}>{tema.nome}</Text>
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
        <Text style={styles.headerTitle}>Nova Pergunta</Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Card do Formulário */}
          <View style={styles.formCard}>
            {/* Seleção de Tema */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tema *</Text>
              <TouchableOpacity 
                style={styles.temaSelector}
                onPress={() => setModalTemaVisible(true)}
              >
                <Text style={[
                  styles.temaSelectorText,
                  !formData.tema && styles.temaSelectorPlaceholder
                ]}>
                  {formData.tema || 'Selecione um tema'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Pergunta */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Pergunta *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Digite a pergunta..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={4}
                value={formData.pergunta}
                onChangeText={(text) => handleInputChange('pergunta', text)}
              />
            </View>

            {/* Alternativas */}
            <View style={styles.formGroup}>
              <View style={styles.alternativasHeader}>
                <Text style={styles.label}>Alternativas *</Text>
                <Text style={styles.alternativasInfo}>
                  {formData.alternativas.filter(a => a.texto.trim() !== '').length} preenchidas
                </Text>
              </View>
              
              <View style={styles.alternativasList}>
                {formData.alternativas.map((alternativa, index) => (
                  <AlternativaItem 
                    key={alternativa.id} 
                    alternativa={alternativa}
                    index={index}
                  />
                ))}
              </View>

              {formData.alternativas.length < 4 && (
                <TouchableOpacity 
                  style={styles.adicionarButton}
                  onPress={adicionarAlternativa}
                >
                  <Ionicons name="add" size={20} color="#4361EE" />
                  <Text style={styles.adicionarButtonText}>Adicionar Alternativa</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Explicação */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Explicação (Opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Explique a resposta correta..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
                value={formData.explicacao}
                onChangeText={(text) => handleInputChange('explicacao', text)}
              />
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.btnSalvar}
              onPress={handleSalvar}
            >
              <Ionicons name="save" size={20} color="#FFFFFF" />
              <Text style={styles.btnSalvarText}>Salvar Pergunta</Text>
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
      </KeyboardAvoidingView>

      {/* Modal de Seleção de Tema */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTemaVisible}
        onRequestClose={() => setModalTemaVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecionar Tema</Text>
              <TouchableOpacity onPress={() => setModalTemaVisible(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.temasList}>
              {temasDisponiveis.map(tema => (
                <TemaOption key={tema.id} tema={tema} />
              ))}
            </ScrollView>
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
    width: 34,
  },
  keyboardAvoid: {
    flex: 1,
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
  temaSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
  },
  temaSelectorText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  temaSelectorPlaceholder: {
    color: '#94A3B8',
  },
  alternativasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  alternativasInfo: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  alternativasList: {
    gap: 12,
  },
  alternativaContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  alternativaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  alternativaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  alternativaActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  corretaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(67, 97, 238, 0.1)',
    borderWidth: 1,
    borderColor: '#4361EE',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  corretaButtonSelecionada: {
    backgroundColor: '#4361EE',
  },
  corretaButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4361EE',
  },
  corretaButtonTextSelecionada: {
    color: '#FFFFFF',
  },
  removerButton: {
    padding: 5,
  },
  alternativaInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
    minHeight: 40,
  },
  adicionarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(67, 97, 238, 0.1)',
    borderWidth: 1,
    borderColor: '#4361EE',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  adicionarButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4361EE',
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
    maxHeight: '80%',
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
  temasList: {
    maxHeight: 300,
  },
  temaOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  temaCor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  temaNome: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});