import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Divider, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { StarRating } from '@/shared/components';

const MOCK_SCORE = 4.3;
const MOCK_RATING_COUNT = 2000;

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
  {
    id: '4',
    authorName: 'Roberto García',
    date: '18 septiembre de 2025',
    score: 5,
    comment: 'Los tacos de canasta son los mejores de la zona.',
  },
  {
    id: '5',
    authorName: 'Laura Martínez',
    date: '2 agosto de 2025',
    score: 3,
    comment: 'Buen sabor, aunque tuve que esperar un poco más de lo esperado.',
  },
  {
    id: '6',
    authorName: 'Diego Hernández',
    date: '14 julio de 2025',
    score: 5,
    comment: 'Siempre encuentro lo que busco y el trato es muy amable.',
  },
];

type Props = {
  vendorId?: string;
};

export function ReviewsScreen({ vendorId: _vendorId }: Props) {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.BackAction color={colors.onPrimary} onPress={() => router.back()} />
        <Appbar.Content
          title="Reseñas"
          color={colors.onPrimary}
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
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

        <Divider style={styles.sectionDivider} />

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
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 32,
  },
  ratingOverview: {
    gap: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sectionDivider: {
    marginVertical: 16,
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
});
