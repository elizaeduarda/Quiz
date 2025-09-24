import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  Modal
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function Home({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  
  // Dados de exemplo
  const [stats, setStats] = useState({
    themes: 12,
    questions: 47,
    completeness: 85
  });

  const recentThemes = [
    {
      id: 1,
      name: 'Programação Web',
      icon: 'code',
      description: 'HTML, CSS, JavaScript',
      questions: 15,
      progress: 85,
      color: '#4361EE'
    },
    {
      id: 2,
      name: 'Matemática',
      icon: 'calculator',
      description: 'Conceitos básicos',
      questions: 22,
      progress: 92,
      color: '#7209B7'
    },
    {
      id: 3,
      name: 'História',
      icon: 'book',
      description: 'Brasil e mundo',
      questions: 18,
      progress: 78,
      color: '#4CC9F0'
    },
    {
      id: 4,
      name: 'Ciências',
      icon: 'flask',
      description: 'Biologia e Química',
      questions: 14,
      progress: 65,
      color: '#F72585'
    }
  ];

  const handleActionPress = (action) => {
    switch(action) {
      case 'new-theme':
        navigation.navigate('ListaTema');
        break;
      case 'new-question':
        navigation.navigate('CadastroPergunta');
        break;
      case 'quick-quiz':
        setModalVisible(true);
        break;
      default:
        break;
    }
  };

  const renderActionCard = (icon, title, subtitle, action, color) => (
    <TouchableOpacity 
      style={[styles.actionCard, { backgroundColor: color }]}
      onPress={() => handleActionPress(action)}
      activeOpacity={0.7}
    >
      <FontAwesome5 name={icon} size={32} color="#FFFFFF" />
      <Text style={styles.actionCardTitle}>{title}</Text>
      <Text style={styles.actionCardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const renderThemeCard = (theme) => (
    <View key={theme.id} style={[styles.themeCard, { borderLeftColor: theme.color }]}>
      <FontAwesome5 name={theme.icon} size={20} color="#4CC9F0" />
      <Text style={styles.themeName}>{theme.name}</Text>
      <Text style={styles.themeDescription}>{theme.description}</Text>
      <View style={styles.themeStats}>
        <Text style={styles.themeStatText}>{theme.questions} perguntas</Text>
        <Text style={styles.themeStatText}>{theme.progress}%</Text>
      </View>
    </View>
  );

  const renderProgressItem = (label, progress) => (
    <View style={styles.progressItem}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressPercentage}>{progress}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <FontAwesome5 name="brain" size={28} color="#FFFFFF" />
          <Text style={styles.logoText}>QuizFutur</Text>
        </View>

      </View>

      {/* Conteúdo Principal */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Seção de Boas-vindas */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Olá!</Text>
          <Text style={styles.welcomeSubtitle}>Pronta(o) para criar quizzes incríveis?</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.themes}</Text>
              <Text style={styles.statLabel}>Temas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.questions}</Text>
              <Text style={styles.statLabel}>Perguntas</Text>
            </View>
            
          </View>
        </View>

        {/* Cards de Ação */}

        <View style={styles.actionCards}>
          {/* BOATAO DE CADASTRAR TEMA */}
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#4361EE' }]}
            onPress={() => navigation.navigate('CadastroTema')}>
            <FontAwesome5 name="folder-plus" size={32} color="#FFFFFF" />
            <Text style={styles.actionCardTitle}>Novo Tema</Text>
            <Text style={styles.actionCardSubtitle}>Criar categoria</Text>
          </TouchableOpacity>

          {/* BOATAO DE CADASTRAR PERGUNTA */}
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#7209B7' }]}
            onPress={() => navigation.navigate('CadastroPergunta')}
            activeOpacity={0.7}>
            <FontAwesome5 name="question-circle" size={32} color="#FFFFFF" />
            <Text style={styles.actionCardTitle}>Nova Pergunta</Text>
            <Text style={styles.actionCardSubtitle}>Adicionar quiz</Text>
          </TouchableOpacity>

          {renderActionCard(
            'bolt', 
            'Quiz Rápido', 
            'Iniciar agora', 
            'quick-quiz',
            '#4CC9F0'
          )}
        </View>

        {/* Seção de Temas Recentes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Temas Recentes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ListaTema')}>
              <Text style={styles.viewAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.themesScroll}
          >
            {recentThemes.map(renderThemeCard)}
          </ScrollView>
        </View>

        {/* Seção de Progresso */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seu Progresso</Text>
          <View style={styles.progressCard}>
            {renderProgressItem('Programação Web', 85)}
            {renderProgressItem('Matemática', 92)}
            {renderProgressItem('História', 78)}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons 
            name="home" 
            size={24} 
            color={activeTab === 'home' ? '#4361EE' : '#94A3B8'} 
          />
          <Text style={[
            styles.navText, 
            activeTab === 'home' && styles.navTextActive
          ]}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'themes' && styles.navItemActive]}
          onPress={() => {
            setActiveTab('themes');
            navigation.navigate('ListaTema');  // ← Navega para a lista
          }}>
          <Ionicons 
            name="folder" 
            size={24} 
            color={activeTab === 'themes' ? '#4361EE' : '#94A3B8'} 
          />
          <Text style={[
            styles.navText, 
            activeTab === 'themes' && styles.navTextActive
          ]}>Temas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'questions' && styles.navItemActive]}
          onPress={() => setActiveTab('questions')}
        >
          <Ionicons 
            name="help-circle" 
            size={24} 
            color={activeTab === 'questions' ? '#4361EE' : '#94A3B8'} 
          />
          <Text style={[
            styles.navText, 
            activeTab === 'questions' && styles.navTextActive
          ]}>Perguntas</Text>
        </TouchableOpacity>

        {/*<TouchableOpacity 
          style={[styles.navItem, activeTab === 'quiz' && styles.navItemActive]}
          onPress={() => setActiveTab('quiz')}
        > 
        </TouchableOpacity>*/}
      </View>

      {/* Modal de Quiz Rápido */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Iniciar Quiz Rápido</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.quizOptions}>
              <TouchableOpacity style={styles.quizOption}>
                <Ionicons name="shuffle" size={20} color="#4361EE" />
                <View>
                  <Text style={styles.quizOptionTitle}>Todos os Temas</Text>
                  <Text style={styles.quizOptionSubtitle}>Perguntas aleatórias</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quizOption}>
                <Ionicons name="code" size={20} color="#4361EE" />
                <View>
                  <Text style={styles.quizOptionTitle}>Programação Web</Text>
                  <Text style={styles.quizOptionSubtitle}>15 perguntas</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quizOption}>
                <Ionicons name="calculator" size={20} color="#4361EE" />
                <View>
                  <Text style={styles.quizOptionTitle}>Matemática</Text>
                  <Text style={styles.quizOptionSubtitle}>22 perguntas</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quizOption}>
                <Ionicons name="book" size={20} color="#4361EE" />
                <View>
                  <Text style={styles.quizOptionTitle}>História</Text>
                  <Text style={styles.quizOptionSubtitle}>18 perguntas</Text>
                </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'linear-gradient(90deg, #4361EE 0%, #7209B7 100%)',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
  },
  welcomeCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4CC9F0',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4361EE',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  actionCards: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  actionCardSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CC9F0',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4361EE',
  },
  themesScroll: {
    flexDirection: 'row',
  },
  themeCard: {
    width: 200,
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 15,
    marginRight: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  themeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 5,
  },
  themeDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  themeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  themeStatText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  progressCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  progressItem: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#4361EE',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'linear-gradient(90deg, #4361EE, #7209B7)',
    borderRadius: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2E',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navItemActive: {
    // Estilo para item ativo
  },
  navText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
  },
  navTextActive: {
    color: '#4361EE',
    fontWeight: '600',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CC9F0',
  },
  quizOptions: {
    gap: 15,
  },
  quizOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    gap: 10,
  },
  quizOptionTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  quizOptionSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});