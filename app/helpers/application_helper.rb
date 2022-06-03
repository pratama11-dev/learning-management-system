# frozen_string_literal: true

module ApplicationHelper
  def options_for_curriculums
    Curriculum.all.map { |c| ["#{c.course.name} - #{c.name}", c.id] }
  end

  def options_for_taxsam_talks
    Talk.all.map { |t| ["#{t.name}", t.id] }
  end

  def options_for_videos
    Video.where(resource_id: nil).map { |v| ["#{v.name}", v.id] }
  end

  def mobile_device?
    request.user_agent =~ /Mobile|webOS/
  end
  
  def options_for_select_banners
    select_banners = []
    Course.all.map { |c| 
      select_banners << ["#{c.name}", c.id] 
    }

    Lesson.all.map { |l| 
      select_banners << ["#{l.name}", l.id] 
    }

    Talk.all.map { |t| 
      select_banners << ["#{t.name} - Taxsam Talks", t.id] 
    }
    
    return select_banners
  end

  def options_for_select_lessons
    Lesson.all.map { |l| ["#{l.name}", l.id] }
  end

  def options_for_select_users
    User.all.map { |u| ["#{u.name}", u.id] }
  end
end
