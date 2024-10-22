import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../components/Metrics';

export default StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#f3de98',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: horizontalScale(20)
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cadetblue',
    flexDirection: 'row',
    width: '100%',
    flex: 0.75,
    borderBottomColor: 'black',
    borderBottomWidth: moderateScale(2),
  },
  footer: {
    backgroundColor: 'cadetblue',
    flexDirection: 'row',
    flex: 0.5,
    borderTopColor: 'black',
    borderTopWidth: moderateScale(2)
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(23),
    textAlign: 'center',
    margin: verticalScale(10),
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(15),
    textAlign: 'center',
    margin: verticalScale(10),
  },
  textInput: {
    height: verticalScale(50),
    width: horizontalScale(200),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(15),
    fontSize: moderateScale(16),
    color: '#333',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 3,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameinfoTitle: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    padding: verticalScale(20),
    marginTop: verticalScale(10),
  },
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: moderateScale(15),
    margin: verticalScale(2),
  },
  goodLuck: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    marginTop: verticalScale(10),
  },
  row: {
    marginTop: verticalScale(20),
    padding: verticalScale(10),
  },
  flex: {
    flexDirection: 'row',
  },
  button: {
    margin: verticalScale(40),
    width: horizontalScale(100),
    flexDirection: 'row',
    padding: verticalScale(10),
    backgroundColor: 'cadetblue',
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 3,
    borderWidth: verticalScale(1)
  },
  throwsLeft: {
    fontSize: moderateScale(20),
    fontWeight:'bold'
  },
  throwButton: {
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    shadowColor: 'black',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 3,
    alignItems: 'center',
    padding: verticalScale(10),
    width: verticalScale(180)
  },
  playerName: {
    backgroundColor: '#ebce8f',
    borderColor: 'black',
    borderWidth: moderateScale(1),
    shadowColor: 'black',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 3,
    padding: verticalScale(5),
  },
  playAgain: {
    margin: verticalScale(40),
    flexDirection: 'row',
    padding: verticalScale(10),
    backgroundColor: 'cadetblue',
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 3,
    borderWidth: verticalScale(1)
  },
  pointRow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: horizontalScale(20),
  },
  totalPointsText: {
    borderColor: '#b7c443',
    borderWidth: 1,
    paddingHorizontal: horizontalScale(15),
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: '#d7eb8f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: moderateScale(20),
    padding: verticalScale(2),
  },
  gameEndContainer: {
    justifyContent: 'center',
  },
  gameEndText: {
    justifyContent: 'center',
    fontSize: moderateScale(20),
  },
  scrollViewTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(25),
    marginBottom: verticalScale(30),
  },
  scrollView: {
    backgroundColor: '#f3de98',
    flex: 7,
    alignItems: 'center',
  },
  scoreItem: {
    margin: verticalScale(5),
    flexDirection: 'row',
    backgroundColor: '#bde0cd',
    padding: horizontalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 3,
  },
  textItem: {
    paddingRight: horizontalScale(30),
    fontSize: moderateScale(15),
  },
  textItem2: {
    paddingRight: horizontalScale(10),
    fontSize: moderateScale(15),
  },
  textItem3: {
    paddingRight: horizontalScale(30),
    fontSize: moderateScale(15),
  },
  textItem4: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  clearButton: {
    borderRadius: moderateScale(10),
    backgroundColor: '#9e2b2b',
    marginTop: verticalScale(20),
    padding: verticalScale(10),
    alignItems: 'center'
  },
  noScoresText: {
    alignItems: 'center',
    marginTop: '50%'
  }
});
