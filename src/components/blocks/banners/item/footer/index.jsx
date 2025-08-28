import React from 'react';
import {View, StyleSheet} from 'react-native';
import MatchCountdown from './Countdown';
import CustomMessage from './CustomMessage';
import NavigationControls from '../../controls/NavigationControls';
import useCountdown from '@utils/useCountdown';

const BannerContent = ({
  date,
  styled,
  icon,
  isLoadingAd,
  showNext,
  showPrev,
  onNext,
  onPrev,
}) => {

  const {timeRemaining, isFutureDate} = useCountdown(date);
  
  const {bgColor = '#003d70', borderColor = '#fff', textColor = '#fff'} = styled || {}; // Desestructurar styled

  const isValidDate = dateString => {
    const date = Date.parse(dateString);
    return !isNaN(date);
  };

  return (
    <View style={[
      styles.container, 
      {
        backgroundColor: date && isValidDate(date) && !isFutureDate ? '#fff' : bgColor, 
        borderColor: date && isValidDate(date) && !isFutureDate ? '#f00' : borderColor, 
      }
    ]}>
      <View style={styles.contentWrapper}>
        <NavigationControls 
          onPress={onPrev} 
          show={showPrev} 
          direction="left" 
                    textColor={date && isValidDate(date) && !isFutureDate ? '#000' : textColor} 
        />

        <View style={styles.messageContainer}>
          {isLoadingAd ? (
            <CustomMessage loading={true} textColor={!isFutureDate ? '#000' : textColor} />
          ) : date && isValidDate(date) ? (
            <MatchCountdown 
              timeRemaining={timeRemaining} 
              isFutureDate={isFutureDate} 
              textColor={textColor} 
            />
          ) : (
            <CustomMessage icon={icon} message={date} textColor={textColor} />
          )}
        </View>
        
        <NavigationControls 
          onPress={onNext} 
          show={showNext} 
          direction="right" 
          textColor={date && isValidDate(date) && !isFutureDate ? '#000' : textColor} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    minHeight: 35,
    alignContent: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BannerContent;
