# frozen_string_literal: true

module Webinars
  class UpdateService < ::Webinars::BaseService
    def action
      if webinar_params[:tag].present?
        webinar_params[:tag] = webinar_params[:tag].split(',')
        new_tag = []
        webinar_params[:tag].each do |tag|
          new_tag << tag.gsub('//', '')
        end
      end
      webinar_params[:tag] = new_tag
      webinar.assign_attributes(webinar_params)
      webinar.date = webinar_params[:date]
      
      webinar_speaker_avatars = []
      @params[:avatars].each do |_, avatar|
        if avatar[:speaker_avatar].present?
          webinar_speaker_avatars << {
            io: avatar[:speaker_avatar], 
            filename: avatar[:speaker_name]
          }
        end
      end

      if webinar_speaker_avatars.present?
        webinar.speaker_avatars = nil
        webinar_speaker_avatars.each do |avatar|
          webinar.speaker_avatars.attach(avatar)
        end
      end

      webinar.speaker = webinar.speaker_avatars.attachments.map(&:filename).to_sentence
      webinar.save!
    end

    def webinar
      @webinar ||= Webinar.find_by(slug: @params[:slug])
    end
  end
end
