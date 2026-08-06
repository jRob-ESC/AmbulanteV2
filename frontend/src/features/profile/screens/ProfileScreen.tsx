import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Divider, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserAvatar, StarRating, AppButton } from '@/shared/components';
import { ProductCard } from '@/features/products/components/ProductCard';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Enfrijoladas con pollo', price: 55.00, imageUrl: 'https://picsum.photos/200?p=1' },
  { id: 2, name: 'Tacos de canasta', price: 15.00, imageUrl: 'https://picsum.photos/200?p=2' },
  { id: 3, name: 'Torta de milanesa', price: 45.00, imageUrl: 'https://picsum.photos/200?p=3' },
  { id: 4, name: 'Agua de horchata', price: 20.00, imageUrl: 'https://picsum.photos/200?p=4' },
];

const MOCK_REVIEWS = [
  {
    id: '1',
    authorName: 'María López',
    date: '27 diciembre de 2025',
    score: 4,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    authorName: 'Carlos Ramos',
    date: '15 noviembre de 2025',
    score: 5,
    comment: 'Excelente servicio, muy recomendable.',
  },
  {
    id: '3',
    authorName: 'Ana Pérez',
    date: '3 octubre de 2025',
    score: 4,
    comment: 'Buena atención y productos de calidad.',
  },
];

const MOCK_SCORE = 4.3;
const MOCK_RATING_COUNT = 2000;

export function ProfileScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color={colors.onPrimary} onPress={() => router.back()} />
        <Appbar.Content
          title="Perfil de usuario"
          color={colors.onPrimary}
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <UserAvatar
            userId={1}
            avatarUrl="https://i.pravatar.cc/150?img=12"
            size={96}
            isActive
            activeIndicatorSize={20}
          />

          <Text variant="titleLarge" style={styles.name}>
            Juan Pérez
          </Text>

          <View style={styles.ratingRow}>
            <StarRating score={MOCK_SCORE} size={16} />
            <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
              ({MOCK_RATING_COUNT.toLocaleString()})
            </Text>
          </View>

          <View style={styles.actionsRow}>
            <AppButton
              icon="message-outline"
              onPress={() => {}}
              style={styles.actionButton}
            >
              Iniciar chat
            </AppButton>

            <AppButton
              icon="map-marker-outline"
              onPress={() => {}}
              style={styles.actionButton}
            >
              Ver en mapa
            </AppButton>
          </View>
        </View>

        <Divider />

        <View style={styles.productsContainer}>
          <View style={styles.productsHeader}>
            <Text variant="titleMedium">Productos</Text>
            <Pressable
              style={styles.seeAll}
              onPress={() => router.push('/vendors/catalog' as any)}
            >
              <Text variant="bodySmall" style={{ color: colors.primary, fontWeight: 'bold' }}>
                Ver todo
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.productsGrid}>
            {MOCK_PRODUCTS.map((product) => (
              <View key={product.id} style={styles.cardWrapper}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </View>

        <Divider />

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Reseñas
          </Text>

          <View style={styles.ratingOverview}>
            <View style={styles.ratingRow}>
              <StarRating score={MOCK_SCORE} size={20} />
              <Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant, marginLeft: 4 }}>
                de 5
              </Text>
            </View>
            <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
              {MOCK_RATING_COUNT.toLocaleString()} calificaciones
            </Text>
          </View>

          <Text variant="titleSmall" style={[styles.sectionTitle, { marginTop: 12 }]}>
            Principales Reseñas
          </Text>

          {MOCK_REVIEWS.map((review, index) => (
            <View key={review.id}>
              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <StarRating score={review.score} size={14} />
                  <Text variant="bodyMedium" style={[styles.reviewAuthor, { color: colors.onSurface }]}>
                    {review.authorName}
                  </Text>
                </View>
                <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant, marginBottom: 4 }}>
                  {review.date}
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.onSurface }}>
                  {review.comment}
                </Text>
              </View>
              {index < MOCK_REVIEWS.length - 1 && <Divider style={styles.reviewDivider} />}
            </View>
          ))}

          <AppButton
            icon="chevron-right"
            contentStyle={styles.moreReviewsContent}
            style={styles.moreReviewsButton}
            variant="secondary"
            onPress={() => {}}
          >
            Ver más opiniones
          </AppButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: '700',
  },
  content: {
    paddingBottom: 32,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 16,
    gap: 8,
  },
  name: {
    fontWeight: '700',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    alignSelf: 'auto',
    borderRadius: 24,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 12,
  },
  productsContainer: {
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  cardWrapper: {
    width: '48%',
  },
  ratingOverview: {
    gap: 4,
  },
  reviewItem: {
    paddingVertical: 12,
    gap: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewAuthor: {
    fontWeight: '600',
  },
  reviewDivider: {
    marginVertical: 2,
  },
  moreReviewsButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    borderWidth: 0,
  },
  moreReviewsContent: {
    flexDirection: 'row-reverse',
  },
});
