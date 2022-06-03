# frozen_string_literal: true

module DateHelper
  def readable_date(date)
    return '-' if date.blank?

    I18n.l(date, format: '%A, %d %B %Y')
  end

  def readable_date_2(date)
    return '-' if date.blank?

    I18n.l(date, format: '%d %B %Y')
  end

  def readable_date_3(date)
    return '-' if date.blank?

    I18n.l(date, format: '%d-%m-%Y')
  end

  def readable_date_4(date)
    return '-' if date.blank?

    I18n.l(date, format: 'tanggal %d Bulan %B Tahun %Y')
  end

  def readable_timestamp(date)
    return '-' if date.blank?

    I18n.l(date, format: '%A, %d %B %Y %H:%M')
  end

  def readable_timestamp_2(date)
    return '-' if date.blank?

    I18n.l(date, format: '%d %B %Y - %H:%M')
  end

  def readable_timestamp_3(date)
    return '-' if date.blank?

    I18n.l(date, format: '%d %B %Y %H:%M:%S')
  end

  def readable_hour(date)
    return '-' if date.blank?

    I18n.l(date, format: '%H:%M')
  end

  def html_input_date(date)
    return '' if date.blank?

    I18n.l(date, format: '%d/%m/%Y')
  end
end
