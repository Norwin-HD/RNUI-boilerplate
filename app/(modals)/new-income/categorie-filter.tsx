import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Footer from '../new-income/categories-components/Footer';
import Header from '../new-income/categories-components/Header';
import InputSearch from '../new-income/categories-components/input-search';
import SelectCategories from '../new-income/categories-components/select-categories';
import { useCategories } from './hooks/use-search';

const CategoriaFilterScreen: React.FC = () => {
	const { filteredCategories, setQuery } = useCategories();

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1 }}>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={{ paddingBottom: verticalScale(90) }}
					keyboardShouldPersistTaps="handled"
				>
					<View style={styles.column3}>
						<Header />
						<InputSearch onChangeText={setQuery} />
						<SelectCategories categories={filteredCategories} />
					</View>
				</ScrollView>
				<View style={styles.staticFooter}>
					<Footer />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default CategoriaFilterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: verticalScale(10),
		backgroundColor: '#FFFFFF',
	},
	scrollView: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	staticFooter: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		paddingHorizontal: moderateScale(20),
		paddingBottom: verticalScale(12),
		paddingTop: verticalScale(8),
		backgroundColor: '#FFFFFF',
	},
	column3: {
		marginBottom: verticalScale(29),
		marginHorizontal: moderateScale(20),
	},
});

