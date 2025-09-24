import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  RefreshControl,
  Switch,
  Modal
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function ListaTema({ navigation, route }) {
  const [temas, setTemas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [temaSelecionado, setTemaSelecionado] = useState(null);
  const [formEditar, setFormEditar] = useState({
    nome: '',
    descricao: '',
    cor: '#4361EE'
  });

  // Dados mockados - depois você substitui pela API
  const temasMock = [
    {
      id: 1,
      nome: 'Programação Web',
      descricao: 'HTML, CSS, JavaScript e frameworks modernos',
      cor: '#4361EE',
      dificuldade: 'medium',
      perguntas: 15,
      criadoEm: '2024-01-15',
    },
    {
      id: 2,
      nome: 'Matemática',
      descricao: 'Conceitos matemáticos do ensino fundamental e médio',
      cor: '#7209B7',
      dificuldade: 'easy',
      perguntas: 22,
      criadoEm: '2024-01-10',
    },
    {
      id: 3,
      nome: 'História do Brasil',
      descricao: 'Eventos importantes da história brasileira',
      cor: '#4CC9F0',
      dificuldade: 'medium',
      perguntas: 18,
      criadoEm: '2024-01-08',
    },
    {
      id: 4,
      nome: 'Ciências',
      descricao: 'Biologia, Química e Física',
      cor: '#F72585',
      dificuldade: 'hard',
      perguntas: 14,
      criadoEm: '2024-01-05',
    }
  ];

  useEffect(() => {
    carregarTemas();
  }, []);

  const carregarTemas = () => {
    setRefreshing(true);
    // Simular carregamento de API
    setTimeout(() => {
      setTemas(temasMock);
      setRefreshing(false);
    }, 1000);
  };

  const abrirEditar = (tema) => {
    setTemaSelecionado(tema);
    setFormEditar({
      nome: tema.nome,
      descricao: tema.descricao,
      cor: tema.cor
    });
    setModalEditarVisible(true);
  };

  const abrirExcluir = (tema) => {
    setTemaSelecionado(tema);
    setModalExcluirVisible(true);
  };

  const handleEditar = () => {
    if (!formEditar.nome.trim() || !formEditar.descricao.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    setTemas(prev => prev.map(tema =>
      tema.id === temaSelecionado.id
        ? { ...tema, ...formEditar }
        : tema
    ));

    Alert.alert('Sucesso', 'Tema atualizado com sucesso!');
    setModalEditarVisible(false);
    setTemaSelecionado(null);
  };

  const handleExcluir = () => {
    setTemas(prev => prev.filter(tema => tema.id !== temaSelecionado.id));
    Alert.alert('Sucesso', 'Tema excluído com sucesso!');
    setModalExcluirVisible(false);
    setTemaSelecionado(null);
  };

  const getDificuldadeInfo = (dificuldade) => {
    const config = {
      easy: { label: 'Fácil', icon: 'smile', color: '#10B981' },
      medium: { label: 'Médio', icon: 'meh', color: '#F59E0B' },
      hard: { label: 'Difícil', icon: 'frown', color: '#F72585' }
    };
    return config[dificuldade] || config.medium;
  };

  const TemaCard = ({ tema }) => {
    const dificuldade = getDificuldadeInfo(tema.dificuldade);
    
    return (
      <View style={[styles.temaCard, { borderLeftColor: tema.cor }]}>
        <View style={styles.temaHeader}>
          <View style={styles.temaInfo}>
            <View style={[styles.corTema, { backgroundColor: tema.cor }]} />
            <Text style={styles.temaNome}>{tema.nome}</Text>
            
          </View>
          <View style={styles.temaAcoes}>
            <TouchableOpacity 
              style={styles.acaoButton}
              onPress={() => abrirEditar(tema)}
            >
              <Ionicons name="pencil" size={18} color="#4361EE" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.acaoButton}
              onPress={() => abrirExcluir(tema)}
            >
              <Ionicons name="trash" size={18} color="#F72585" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.temaDescricao}>{tema.descricao}</Text>
        
        <View style={styles.temaStats}>
          <View style={styles.statItem}>
            <FontAwesome5 name="question-circle" size={12} color="#94A3B8" />
            <Text style={styles.statText}>{tema.perguntas} perguntas</Text>
          </View>
          
          <View style={styles.statItem}>
            <FontAwesome5 name={dificuldade.icon} size={12} color={dificuldade.color} />
            <Text style={[styles.statText, { color: dificuldade.color }]}>
              {dificuldade.label}
            </Text>
          </View>
        </View>
        
        <Text style={styles.temaData}>Criado em: {formatarData(tema.criadoEm)}</Text>
      </View>
    );
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}  // ← Mude para navegar para Home
            >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Temas</Text>
        <TouchableOpacity 
            style={styles.novoButton}
            onPress={() => navigation.navigate('CadastroTema')}
        >
            <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        </View>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={carregarTemas}
            colors={['#4361EE']}
            tintColor="#4361EE"
          />
        }
      >
        {/* Estatísticas Rápidas */}
        <View style={styles.estatisticasCard}>
          <Text style={styles.estatisticasTitle}>Resumo</Text>
          <View style={styles.estatisticasGrid}>
            <View style={styles.estatisticaItem}>
              <Text style={styles.estatisticaValor}>{temas.length}</Text>
              <Text style={styles.estatisticaLabel}>Total de Temas</Text>
            </View>
            
            <View style={styles.estatisticaItem}>
              <Text style={styles.estatisticaValor}>
                {temas.reduce((total, tema) => total + tema.perguntas, 0)}
              </Text>
              <Text style={styles.estatisticaLabel}>Perguntas</Text>
            </View>
          </View>
        </View>

        {/* Lista de Temas */}
        <View style={styles.listaSection}>
          <Text style={styles.listaTitle}>Temas Cadastrados</Text>
          {temas.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open" size={64} color="#94A3B8" />
              <Text style={styles.emptyStateTitle}>Nenhum tema cadastrado</Text>
              <Text style={styles.emptyStateText}>
                Comece criando seu primeiro tema para organizar suas perguntas
              </Text>
              <TouchableOpacity 
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate('CadastroTema')}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.emptyStateButtonText}>Criar Primeiro Tema</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.temasList}>
              {temas.map(tema => (
                <TemaCard key={tema.id} tema={tema} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal de Edição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditarVisible}
        onRequestClose={() => setModalEditarVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Tema</Text>
              <TouchableOpacity onPress={() => setModalEditarVisible(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome do Tema</Text>
              <TextInput
                style={styles.input}
                value={formEditar.nome}
                onChangeText={(text) => setFormEditar(prev => ({ ...prev, nome: text }))}
                placeholder="Nome do tema"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                value={formEditar.descricao}
                onChangeText={(text) => setFormEditar(prev => ({ ...prev, descricao: text }))}
                placeholder="Descrição do tema"
              />
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.btnCancelar}
                onPress={() => setModalEditarVisible(false)}
              >
                <Text style={styles.btnCancelarText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.btnSalvar}
                onPress={handleEditar}
              >
                <Text style={styles.btnSalvarText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalExcluirVisible}
        onRequestClose={() => setModalExcluirVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Excluir Tema</Text>
              <TouchableOpacity onPress={() => setModalExcluirVisible(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.excluirText}>
              Tem certeza que deseja excluir o tema "{temaSelecionado?.nome}"?
            </Text>
            <Text style={styles.excluirAviso}>
              Esta ação não pode ser desfeita. Todas as perguntas relacionadas serão perdidas.
            </Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.btnCancelar}
                onPress={() => setModalExcluirVisible(false)}
              >
                <Text style={styles.btnCancelarText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.btnExcluir}
                onPress={handleExcluir}
              >
                <Text style={styles.btnExcluirText}>Excluir</Text>
              </TouchableOpacity>
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
  novoButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  estatisticasCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  estatisticasTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CC9F0',
    marginBottom: 15,
  },
  estatisticasGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  estatisticaItem: {
    alignItems: 'center',
    flex: 1,
  },
  estatisticaValor: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4361EE',
    marginBottom: 5,
  },
  estatisticaLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  listaSection: {
    marginBottom: 20,
  },
  listaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CC9F0',
    marginBottom: 15,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyStateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#4361EE',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  emptyStateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  temasList: {
    gap: 12,
  },
  temaCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  temaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  temaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  corTema: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  temaNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  temaAcoes: {
    flexDirection: 'row',
    gap: 8,
  },
  acaoButton: {
    padding: 6,
  },
  temaDescricao: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  temaStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  temaData: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
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
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CC9F0',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  excluirText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  excluirAviso: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  btnCancelar: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnCancelarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  btnSalvar: {
    backgroundColor: '#4361EE',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnSalvarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  btnExcluir: {
    backgroundColor: '#F72585',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnExcluirText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});